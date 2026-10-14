#!/usr/bin/env node
// Compares the asset fingerprints of the local production build (dist/) with the
// currently deployed site, so a stale or half-finished deploy is caught instead
// of assumed. Run it after a push (or let .github/workflows/verify-deploy.yml
// run it in CI).
//
// Usage:
//   node scripts/verify-deploy.mjs [options]
//
// Options:
//   --site <url>        Live site origin            (default: https://vakilkhoini.ir)
//   --dir <path>        Local build directory       (default: dist)
//   --wait <seconds>    Poll until the deploy catches up (default: 0 = check once)
//   --interval <secs>   Poll interval               (default: 15)
//   --names-only        Compare asset file names only, skip byte/hash comparison
//   --help              Show this message
//
// Exit codes: 0 = live build matches, 1 = mismatch or timeout, 2 = cannot check
//
// The build must be current before running: `npm run build`.

import { createHash } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

const ASSET_RE = /\/(?:assets|src)\/[A-Za-z0-9@._%/-]+\.(?:js|css)/g

function parseArgs(argv) {
  const opts = {
    site: process.env.SITE_URL || 'https://vakilkhoini.ir',
    dir: 'dist',
    wait: 0,
    interval: 15,
    namesOnly: false,
    help: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const value = argv[i + 1]
    if (arg === '--site') opts.site = value, i++
    else if (arg === '--dir') opts.dir = value, i++
    else if (arg === '--wait') opts.wait = Number(value), i++
    else if (arg === '--interval') opts.interval = Number(value), i++
    else if (arg === '--names-only') opts.namesOnly = true
    else if (arg === '--help' || arg === '-h') opts.help = true
    else {
      console.error(`Unknown option: ${arg}`)
      opts.help = true
    }
  }
  opts.site = opts.site.replace(/\/+$/, '')
  return opts
}

const USAGE = `Verify that the deployed site serves the build in ./dist.

  node scripts/verify-deploy.mjs [--site <url>] [--dir <path>] [--wait <seconds>]
                                 [--interval <seconds>] [--names-only]

  --site       live origin (default: https://vakilkhoini.ir)
  --dir        local build directory (default: dist)
  --wait       keep polling until the deploy catches up (default: 0 = check once)
  --interval   polling interval in seconds (default: 15)
  --names-only compare asset names only, skip sha256 byte comparison

Run \`npm run build\` first. Exit code 0 means the live site matches this build.`

function extractAssets(html) {
  const found = html.match(ASSET_RE)
  return [...new Set(found || [])].sort()
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function shortHash(hex) {
  return hex ? hex.slice(0, 10) : 'missing'
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'cache-control': 'no-cache' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

async function fetchBytes(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function readLocalAssets(distDir) {
  const indexPath = join(distDir, 'index.html')
  let html
  try {
    html = await readFile(indexPath, 'utf8')
  } catch {
    throw Object.assign(new Error(`No build found at ${indexPath}`), { exitCode: 2 })
  }
  const assets = extractAssets(html)
  const files = new Map()
  for (const asset of assets) {
    const filePath = join(distDir, asset.replace(/^\//, ''))
    try {
      files.set(asset, await readFile(filePath))
    } catch {
      throw Object.assign(new Error(`Asset referenced by dist/index.html is missing on disk: ${asset}`), {
        exitCode: 2,
      })
    }
  }
  return { assets, files }
}

async function inspectLive(site) {
  // cache-buster: never judge the deployment by a cached HTML response
  const html = await fetchText(`${site}/?verify-deploy=${Date.now()}`)
  return extractAssets(html)
}

async function compare({ site, distDir, namesOnly }) {
  const local = await readLocalAssets(distDir)
  const liveAssets = await inspectLive(site)

  const localSet = new Set(local.assets)
  const liveSet = new Set(liveAssets)
  const missingLive = local.assets.filter((a) => !liveSet.has(a))
  const extraLive = liveAssets.filter((a) => !localSet.has(a))

  const hashMismatches = []
  if (!namesOnly && missingLive.length === 0 && extraLive.length === 0) {
    for (const asset of local.assets) {
      const [liveBytes] = await Promise.all([fetchBytes(`${site}${asset}`)])
      const localHash = sha256(local.files.get(asset))
      const liveHash = sha256(liveBytes)
      if (localHash !== liveHash) hashMismatches.push({ asset, localHash, liveHash })
    }
  }

  return {
    localAssets: local.assets,
    liveAssets,
    missingLive,
    extraLive,
    hashMismatches,
    ok: missingLive.length === 0 && extraLive.length === 0 && hashMismatches.length === 0,
  }
}

function report(result, { site, distDir, namesOnly }) {
  console.log(`local build : ${distDir}/index.html (${result.localAssets.length} assets)`)
  console.log(`live site   : ${site} (${result.liveAssets.length} assets)`)
  if (namesOnly) console.log('mode        : names only (hash comparison skipped)')

  if (result.ok) {
    for (const asset of result.localAssets) console.log(`  ✓ ${asset}`)
    console.log('\nMATCH — the live site serves exactly this build.')
    return
  }

  console.log('\nMISMATCH — the live site does not serve this build:')
  for (const asset of result.missingLive) console.log(`  ✗ not deployed yet : ${asset}`)
  for (const asset of result.extraLive) console.log(`  ✗ still live       : ${asset}`)
  for (const m of result.hashMismatches) {
    console.log(`  ✗ different bytes  : ${m.asset} (local ${shortHash(m.localHash)} vs live ${shortHash(m.liveHash)})`)
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    console.log(USAGE)
    return 0
  }

  const distDir = resolve(projectRoot, opts.dir)
  const deadline = Date.now() + opts.wait * 1000
  let attempt = 0

  for (;;) {
    attempt++
    try {
      const result = await compare({ site: opts.site, distDir, namesOnly: opts.namesOnly })
      if (result.ok) {
        report(result, { site: opts.site, distDir: opts.dir, namesOnly: opts.namesOnly })
        return 0
      }
      if (Date.now() >= deadline) {
        report(result, { site: opts.site, distDir: opts.dir, namesOnly: opts.namesOnly })
        console.error(
          opts.wait > 0
            ? `\nDeploy did not catch up within ${opts.wait}s (${attempt} attempts).`
            : '\nRe-run with --wait <seconds> to poll until the deploy catches up.',
        )
        return 1
      }
      console.log(`attempt ${attempt}: deploy has not caught up yet — retrying in ${opts.interval}s`)
      await new Promise((r) => setTimeout(r, opts.interval * 1000))
    } catch (err) {
      const code = err.exitCode || 2
      console.error(`Cannot verify deployment: ${err.message}`)
      if (code === 2) {
        console.error('Is the build present? Run `npm run build` first.')
        return 2
      }
      if (Date.now() >= deadline) return 2
      console.log(`attempt ${attempt}: ${err.message} — retrying in ${opts.interval}s`)
      await new Promise((r) => setTimeout(r, opts.interval * 1000))
    }
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`Unexpected failure: ${err.stack || err.message}`)
    process.exit(2)
  })
