import { useEffect } from 'react'

const SITE_URL = 'https://vakilkhoini.ir'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Sets document title, meta description, canonical URL, Open Graph / Twitter
 * tags and an optional JSON-LD block for the current route. Cleans up the
 * JSON-LD block on unmount so pages don't leak structured data into each other.
 */
export default function useSEO({ title, description, path, image, jsonLd, noindex, ogType, article, keywords }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`
    const ogImage = image || DEFAULT_IMAGE

    if (title) document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', canonicalUrl)

    // Open Graph
    setMeta('property', 'og:type', ogType || 'website')
    setMeta('property', 'og:locale', 'fa_IR')
    setMeta('property', 'og:site_name', 'دفتر وکالت پرستو خوئینی - وکیل پایه یک دادگستری')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:image:alt', title)

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    // Article-specific OG tags
    if (article) {
      setMeta('property', 'article:author', SITE_URL)
      setMeta('property', 'article:publisher', SITE_URL)
      if (article.datePublished) setMeta('property', 'article:published_time', article.datePublished)
      if (article.dateModified) setMeta('property', 'article:modified_time', article.dateModified)
      if (article.section) setMeta('property', 'article:section', article.section)
      if (article.tags) {
        // Remove old article:tag elements
        document.head.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove())
        article.tags.forEach(tag => setMeta('property', 'article:tag', tag))
      }
    }

    if (jsonLd) setJsonLd('page-jsonld', jsonLd)

    return () => {
      setJsonLd('page-jsonld', null)
    }
  }, [title, description, path, image, jsonLd, noindex, ogType, article, keywords])
}

export { SITE_URL, DEFAULT_IMAGE }
