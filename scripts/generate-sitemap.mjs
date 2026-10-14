// Generates public/sitemap.xml from the site's content data.
// Run automatically before every build (see package.json "prebuild").
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { allRoutes } from '../src/data/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://vakilkhoini.ir'
const today = new Date().toISOString().slice(0, 10)

// Route list is shared with scripts/prerender.mjs (see src/data/routes.js).
const allUrls = allRoutes()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const outPath = resolve(__dirname, '../public/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`sitemap.xml generated with ${allUrls.length} URLs -> ${outPath}`)
