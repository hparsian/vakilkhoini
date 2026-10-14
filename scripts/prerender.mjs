#!/usr/bin/env node
// Build-time prerenderer.
//
// Runs after `vite build` and turns the single-page shell into real HTML files:
// one per route (plus /404.html). Every file carries that route's own <title>,
// meta description, canonical, Open Graph/Twitter tags and JSON-LD, and the
// page markup is rendered on the server so crawlers and social scrapers
// (WhatsApp, Telegram, ...) that never execute JavaScript see the real page.
//
// In the browser src/main.jsx hydrates this markup instead of re-rendering it.
//
// Cloudflare serves these flat files with the default `html_handling`
// ("/maghalat/foo" -> "maghalat/foo.html"); `not_found_handling: "404-page"`
// in wrangler.json turns unmatched URLs into a real HTTP 404 with /404.html.

import { createRequire } from 'node:module'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { allRoutes, aliasRoutes } from '../src/data/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = join(root, 'dist')
const workDir = join(root, 'node_modules', '.cache', 'prerender')

const SITE_URL = 'https://vakilkhoini.ir'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`
const NOT_FOUND_ROUTE = '/404'
const SSR_FILE = join(workDir, 'ssr.mjs')

const require = createRequire(join(root, 'package.json'))
const esbuild = require('esbuild')

// esbuild resolves absolute filesystem paths; `import()` below needs a file URL.
const absPath = (p) => JSON.stringify(p)

const SSR_ENTRY = `
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from ${absPath(join(root, 'src/App.jsx'))}
import { RouterProvider } from ${absPath(join(root, 'src/router.jsx'))}
import { ToastProvider } from ${absPath(join(root, 'src/context/ToastContext.jsx'))}
import { ssrMeta } from ${absPath(join(root, 'src/hooks/useSEO.js'))}

export function renderRoute(path) {
  ssrMeta.value = null
  const html = renderToString(
    React.createElement(
      RouterProvider,
      { initialPath: path },
      React.createElement(ToastProvider, null, React.createElement(App)),
    ),
  )
  return { html, meta: ssrMeta.value }
}
`

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Safe to embed inside <script>: no `</script>` can be formed, and U+2028/2029
// stay legal string characters.
const jsonForHtml = (data) =>
  JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')

function replaceOnce(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`)
  return html.replace(regex, replacement)
}

function applyHead(template, meta, canonicalPath) {
  const title = meta.title
  const description = meta.description
  const image = meta.image || DEFAULT_IMAGE
  const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

  let html = template
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'a <title> tag')
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    'the description meta',
  )
  html = replaceOnce(
    html,
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    'the robots meta',
  )
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    'the canonical link',
  )
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image']) {
    const value = { 'og:title': title, 'og:description': description, 'og:url': canonical, 'og:image': image }[key]
    html = replaceOnce(
      html,
      new RegExp(`<meta property="${key}" content="[^"]*" \\/>`),
      `<meta property="${key}" content="${escapeHtml(value)}" />`,
      `the ${key} meta`,
    )
  }
  for (const key of ['twitter:title', 'twitter:description', 'twitter:image']) {
    const value = { 'twitter:title': title, 'twitter:description': description, 'twitter:image': image }[key]
    html = replaceOnce(
      html,
      new RegExp(`<meta name="${key}" content="[^"]*" \\/>`),
      `<meta name="${key}" content="${escapeHtml(value)}" />`,
      `the ${key} meta`,
    )
  }

  // The inline JSON-LD in index.html documents the whole site; per route the
  // page's own graph (article, service, breadcrumbs, FAQ, ...) replaces it. The
  // id matches the one useSEO writes in the browser, so it gets updated in place
  // instead of duplicated after hydration.
  if (meta.jsonLd) {
    html = replaceOnce(
      html,
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="page-jsonld" type="application/ld+json">${jsonForHtml(meta.jsonLd)}</script>`,
      'the inline JSON-LD block',
    )
  }
  return html
}

const outputPathFor = (route) => {
  if (route === '/') return join(distDir, 'index.html')
  const clean = route.replace(/^\/+|\/+$/g, '')
  return join(distDir, `${clean}.html`)
}

// Imported images must resolve to the very same hashed URL that vite built, or
// hydration would replace them (and change the markup).
const viteAssetPlugin = {
  name: 'vite-asset-urls',
  setup(build) {
    build.onResolve({ filter: /\.(jpe?g|png|svg|webp|gif|avif)$/ }, (args) => ({
      path: args.path,
      namespace: 'vite-asset',
      pluginData: { importer: args.importer },
    }))
    build.onLoad({ filter: /.*/, namespace: 'vite-asset' }, async (args) => {
      const source = resolve(dirname(args.pluginData.importer), args.path)
      const name = basename(source)
      const files = await readdir(join(distDir, 'assets'))
      const match = files.find((f) => f === name || f.startsWith(name.replace(/\.[^.]+$/, '') + '-'))
      if (!match) {
        return { errors: [{ text: `prerender: ${name} was not emitted by the vite build` }] }
      }
      return { contents: `export default ${JSON.stringify(`/assets/${match}`)}`, loader: 'js' }
    })
  },
}

async function buildSsrBundle() {
  await mkdir(workDir, { recursive: true })
  await esbuild.build({
    plugins: [viteAssetPlugin],
    stdin: { contents: SSR_ENTRY, resolveDir: root, loader: 'jsx', sourcefile: 'prerender-entry.jsx' },
    outfile: SSR_FILE,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    jsx: 'automatic',
    mainFields: ['module', 'main'],
    external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/server', 'react-dom/client'],
    loader: { '.css': 'empty' },
    // some bundled dependencies still call require('react'); give the ESM output
    // a working require so those calls resolve instead of throwing.
    banner: { js: "import { createRequire as __createRequire } from 'module'; const require = __createRequire(import.meta.url);" },
    logLevel: 'silent',
  })
  return import(pathToFileURL(SSR_FILE).href)
}

async function main() {
  let template
  try {
    template = await readFile(join(distDir, 'index.html'), 'utf8')
  } catch {
    console.error(`prerender: no build found at ${join(distDir, 'index.html')} — run \`npm run build\` first.`)
    return 2
  }

  const { renderRoute } = await buildSsrBundle()

  const routes = [
    ...allRoutes().map((route) => route.loc),
    ...Object.keys(aliasRoutes),
    NOT_FOUND_ROUTE,
  ]
  for (const route of routes) {
    if (typeof route !== 'string' || !route.startsWith('/')) {
      throw new Error(`prerender: invalid route entry ${JSON.stringify(route)}`)
    }
  }
  const written = []

  for (const route of routes) {
    const { html: markup, meta } = renderRoute(route)
    if (!meta) throw new Error(`prerender: ${route} rendered without calling useSEO`)

    // Safety net: with not_found_handling "404-page", a route that failed to
    // resolve would ship a real 404 for a valid URL — fail the build instead.
    const expectedCanonical = aliasRoutes[route] || route
    if (route !== NOT_FOUND_ROUTE) {
      if (meta.noindex) throw new Error(`prerender: ${route} resolved to a noindex page`)
      if (meta.path !== expectedCanonical) {
        throw new Error(`prerender: ${route} advertised canonical ${meta.path}, expected ${expectedCanonical}`)
      }
    }

    let html = applyHead(template, meta, expectedCanonical)
    html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${markup}</div>`, 'the #root container')

    const outPath = outputPathFor(route)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    written.push({ route, outPath, bytes: Buffer.byteLength(html) })
    console.log(`  ✓ ${route.padEnd(46)} -> ${outPath.slice(root.length + 1)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`)
  }

  if (written.length !== new Set(written.map((w) => w.outPath)).size) {
    throw new Error('prerender: two routes wrote the same file')
  }

  await rm(workDir, { recursive: true, force: true })
  console.log(`prerendered ${written.length} routes (including 404.html)`)
  return 0
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`prerender failed: ${err.message}`)
    if (err.stack) console.error(err.stack.split('\n').slice(1, 6).join('\n'))
    process.exit(1)
  })
