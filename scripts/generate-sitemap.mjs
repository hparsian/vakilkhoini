// Generates public/sitemap.xml from the site's content data.
// Run automatically before every build (see package.json "prebuild").
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { articles, services } from '../src/data/content.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://vakilkhoini.ir'
const today = new Date().toISOString().slice(0, 10)

const staticUrls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/mohasebe', changefreq: 'weekly', priority: '0.9' },
  { loc: '/maghalat', changefreq: 'weekly', priority: '0.8' },
]

const articleUrls = articles.map((a) => ({
  loc: `/maghalat/${a.id}`,
  changefreq: 'monthly',
  priority: '0.7',
}))

const serviceUrls = services.map((s) => ({
  loc: `/khadamat/${s.id}`,
  changefreq: 'monthly',
  priority: '0.8',
}))

const allUrls = [...staticUrls, ...serviceUrls, ...articleUrls]

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
