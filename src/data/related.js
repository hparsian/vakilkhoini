// Automatic internal linking.
//
// Every article and service page links to its most related siblings, computed
// from the content itself (title, tags, category, summary and body) instead of
// hand-maintained lists. The same engine powers the calculators hub, which
// links out to the articles and services that match its topics.
//
// Ranking is a weighted cosine similarity over normalized tokens:
//   tags    x4   (editorial intent, most specific)
//   title   x3
//   category/service sub-services x3
//   summary x1
//   body    x1
//
// Deterministic: same input, same order (ties break on id), so the build output
// is stable and cache-friendly.

import { articles, services } from './content.js'

const STOPWORDS = new Set([
  'از', 'به', 'با', 'بر', 'تا', 'در', 'را', 'که', 'این', 'آن', 'هم', 'نیز', 'هر', 'یا', 'اگر',
  'اما', 'برای', 'بین', 'بود', 'باشد', 'شد', 'شده', 'شود', 'شوند', 'کرد', 'کند', 'کنید', 'دارد',
  'دهد', 'طور', 'مورد', 'روی', 'بدون', 'حال', 'زمان', 'سال', 'یک', 'دو', 'سه', 'چند', 'همه', 'غیر',
  'است', 'نیست', 'خود', 'وی', 'ما', 'شما', 'طبق', 'قانون', 'ماده', 'مواد', 'های', 'هایی', 'ترین',
])

const normalize = (value) =>
  String(value ?? '')
    .replace(/[\u200c\u200e\u200f]/g, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u064b-\u0652]/g, '')
    .toLowerCase()

const tokenize = (text) =>
  normalize(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token))

function toBag(parts) {
  const bag = new Map()
  for (const { text, weight } of parts) {
    if (!text) continue
    const chunks = Array.isArray(text) ? text : [text]
    for (const chunk of chunks) {
      for (const token of tokenize(chunk)) {
        bag.set(token, Math.max(bag.get(token) ?? 0, weight))
      }
    }
  }
  return bag
}

const articleBag = (a) =>
  toBag([
    { text: a.tags, weight: 4 },
    { text: a.title, weight: 3 },
    { text: a.category, weight: 2 },
    { text: a.excerpt, weight: 1 },
    { text: a.fullContent, weight: 1 },
  ])

const serviceBag = (s) =>
  toBag([
    { text: s.title, weight: 4 },
    { text: s.subServices, weight: 3 },
    { text: s.category, weight: 2 },
    { text: s.description, weight: 1 },
    { text: s.fullDesc, weight: 1 },
  ])

function cosine(a, b) {
  let dot = 0
  for (const [token, weight] of a) {
    const other = b.get(token)
    if (other) dot += weight * other
  }
  if (!dot) return 0
  let normA = 0
  let normB = 0
  for (const weight of a.values()) normA += weight * weight
  for (const weight of b.values()) normB += weight * weight
  return dot / Math.sqrt(normA * normB)
}

const articleIndex = articles.map((item) => ({ id: item.id, item, bag: articleBag(item) }))
const serviceIndex = services.map((item) => ({ id: item.id, item, bag: serviceBag(item) }))

// Related items first; when too few share any vocabulary the newest entries
// fill the remaining slots so every page still links somewhere (crawl depth).
function rank(targetBag, pool, limit, excludeId) {
  const scored = pool
    .filter((entry) => entry.id !== excludeId)
    .map((entry) => ({ entry, score: cosine(targetBag, entry.bag) }))
    .sort((a, b) => b.score - a.score || String(a.entry.id).localeCompare(String(b.entry.id)))

  const related = scored.filter((s) => s.score > 0).slice(0, limit)
  const picked = new Set(related.map((s) => s.entry.id))
  for (const s of scored) {
    if (related.length >= limit) break
    if (picked.has(s.entry.id)) continue
    related.push(s)
    picked.add(s.entry.id)
  }
  return related.map((s) => s.entry.item)
}

const bagFor = (index, item) => index.find((entry) => entry.item === item || entry.id === item?.id)?.bag

/** Articles most related to the given article (never itself). */
export function relatedArticles(article, limit = 4) {
  const bag = bagFor(articleIndex, article)
  return bag ? rank(bag, articleIndex, limit, article?.id) : []
}

/** Services most related to the given article. */
export function relatedServices(article, limit = 3) {
  const bag = bagFor(articleIndex, article)
  return bag ? rank(bag, serviceIndex, limit) : []
}

/** Articles most related to the given service. */
export function relatedArticlesForService(service, limit = 4) {
  const bag = bagFor(serviceIndex, service)
  return bag ? rank(bag, articleIndex, limit) : []
}

/** Other services most related to the given service (never itself). */
export function relatedServicesForService(service, limit = 3) {
  const bag = bagFor(serviceIndex, service)
  return bag ? rank(bag, serviceIndex, limit, service?.id) : []
}

/** Articles matching a free-text topic (used by the calculators hub). */
export function articlesForTopic(keywords, limit = 4) {
  const bag = toBag([{ text: keywords, weight: 4 }])
  return rank(bag, articleIndex, limit)
}

/** Services matching a free-text topic (used by the calculators hub). */
export function servicesForTopic(keywords, limit = 3) {
  const bag = toBag([{ text: keywords, weight: 4 }])
  return rank(bag, serviceIndex, limit)
}
