// Temporary audit (deleted after the run): reads the prerendered HTML in dist/
// and checks the internal link graph — every href resolves, nothing links to
// itself, topic pages cross-link articles/services, and no page is orphaned.
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { allRoutes, aliasRoutes } from '../src/data/routes.js'

const distDir = new URL('../dist/', import.meta.url).pathname
const known = new Set(['/404', ...allRoutes().map((r) => r.loc), ...Object.keys(aliasRoutes)])

async function htmlFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)))
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

const routeOf = (file) => {
  const rel = relative(distDir, file).replace(/\\/g, '/')
  if (rel === 'index.html') return '/'
  return '/' + rel.replace(/\.html$/, '')
}

const files = await htmlFiles(distDir)
const pages = new Map()
for (const file of files) {
  const html = await readFile(file, 'utf8')
  // anchors only: rel=icon/stylesheet etc. are assets, not navigation
  const hrefs = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)]
    .map((m) => m[1].split(/[?#]/)[0])
    .filter((href) => href.startsWith('/') && !href.startsWith('//'))
  pages.set(routeOf(file), [...new Set(hrefs)])
}

// Site chrome = links every page carries (nav, footer). Those are real internal
// links, but they must not satisfy the per-page content-link requirements.
const chromeCount = new Map()
for (const hrefs of pages.values()) {
  for (const href of hrefs) chromeCount.set(href, (chromeCount.get(href) || 0) + 1)
}
const chrome = new Set(
  [...chromeCount.entries()].filter(([, n]) => n >= pages.size * 0.8).map(([href]) => href),
)
const contentLinks = (hrefs) => hrefs.filter((h) => !chrome.has(h))

const problems = []
const inbound = new Map()
for (const route of pages.keys()) inbound.set(route, 0)

for (const [route, hrefs] of pages) {
  for (const href of hrefs) {
    if (!known.has(href)) problems.push(`${route} links to unknown route ${href}`)
    if (href === route && !chrome.has(href)) problems.push(`${route} links to itself`)
    inbound.set(href, (inbound.get(href) || 0) + 1)
  }
}

const isArticle = (r) => r.startsWith('/maghalat/')
const isService = (r) => r.startsWith('/khadamat/')
const countTo = (hrefs, test) => hrefs.filter((h) => test(h) && h !== undefined).length

const aliasSet = new Set(Object.keys(aliasRoutes))

for (const [route, all] of pages) {
  if (route === '/404') continue
  const hrefs = contentLinks(all)
  const own = (h) => h !== route
  if (isArticle(route)) {
    const a = hrefs.filter((h) => isArticle(h) && own(h)).length
    const s = hrefs.filter((h) => isService(h)).length
    if (a < 3) problems.push(`${route} has only ${a} related links to other articles`)
    if (s < 2) problems.push(`${route} has only ${s} related links to services`)
  }
  if (isService(route)) {
    const a = hrefs.filter((h) => isArticle(h)).length
    const s = hrefs.filter((h) => isService(h) && own(h)).length
    if (a < 2) problems.push(`${route} has only ${a} related links to articles`)
    if (s < 2) problems.push(`${route} has only ${s} related links to other services`)
  }
  if (route === '/mohasebe' || route === '/checklist-mobayenameh') {
    const a = hrefs.filter((h) => isArticle(h)).length
    const s = hrefs.filter((h) => isService(h)).length
    if (a < 3 || s < 2) problems.push(`${route} links weakly (${a} articles, ${s} services)`)
  }
  // legacy alias URLs are deliberately not linked to, so they may have no inbound links
  if (inbound.get(route) === 0 && !aliasSet.has(route)) {
    problems.push(`${route} is orphaned (no inbound internal links)`)
  }
}

const sorted = [...inbound.entries()].sort((a, b) => a[1] - b[1])
const contentRoutes = sorted.filter(([r]) => isArticle(r) || isService(r))
console.log(`pages scanned       : ${pages.size}`)
console.log(`internal links      : ${[...pages.values()].reduce((n, h) => n + h.length, 0)} (chrome: ${chrome.size} shared targets)`)
console.log(`distinct targets    : ${new Set([...pages.values()].flat()).size}`)
console.log(`least linked articles/services (inbound):`)
for (const [route, count] of contentRoutes.slice(0, 6)) console.log(`  ${String(count).padStart(3)}  ${route}`)
console.log(`problems            : ${problems.length}`)
for (const p of problems.slice(0, 10)) console.log(`  - ${p}`)
console.log(problems.length === 0 ? 'LINK GRAPH OK' : 'LINK GRAPH PROBLEMS')
process.exit(problems.length ? 1 : 0)
