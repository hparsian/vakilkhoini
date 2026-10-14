import { articles, services } from './content.js'

// Single source of truth for the site's public URLs.
// Used by scripts/generate-sitemap.mjs (sitemap.xml) and scripts/prerender.mjs
// (static HTML per route), so a new page is never half-registered.
export const staticRoutes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/khadamat', changefreq: 'weekly', priority: '0.9' },
  { loc: '/mohasebe', changefreq: 'weekly', priority: '0.9' },
  { loc: '/checklist-mobayenameh', changefreq: 'weekly', priority: '0.9' },
  { loc: '/moshavere', changefreq: 'weekly', priority: '0.9' },
  { loc: '/darbareh', changefreq: 'monthly', priority: '0.85' },
  { loc: '/maghalat', changefreq: 'weekly', priority: '0.85' },
  { loc: '/marohe', changefreq: 'monthly', priority: '0.8' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.8' },
  { loc: '/tamas', changefreq: 'monthly', priority: '0.8' },
]

export const serviceRoutes = services.map((s) => ({
  loc: `/khadamat/${s.id}`,
  changefreq: 'monthly',
  priority: '0.8',
}))

export const articleRoutes = articles.map((a) => ({
  loc: `/maghalat/${a.id}`,
  changefreq: 'monthly',
  priority: '0.7',
}))

// Ordered from most to least important; `/` first, matching the sitemap order.
export const allRoutes = () => [...staticRoutes, ...serviceRoutes, ...articleRoutes]

// Legacy URLs that still have to resolve (they render the canonical page and
// advertise its canonical URL). Kept out of sitemap.xml on purpose.
// Mirrors the alias handling in src/App.jsx.
export const aliasRoutes = {
  '/cheklis-amlak': '/checklist-mobayenameh',
  '/maghalat/ghoulnameh-vs-mobayeenameh': '/maghalat/gholnameh-vs-mobayenameh',
}
