import { useState } from 'react'
import { articles, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { BookOpen, Calendar, Clock, ArrowLeft, ChevronLeft, Search, X, Calculator } from 'lucide-react'
import '../components/Articles.css'
import './ArticlePage.css'

export default function ArticlesListPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))]

  const normalize = (str) =>
    String(str || '')
      .replace(/[\u200c\u200e\u200f\s]+/g, ' ')
      .replace(/[يى]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[\u064b-\u0652]/g, '')
      .toLowerCase()
      .trim()

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory
    if (!matchesCategory) return false

    if (!searchQuery.trim()) return true
    const q = normalize(searchQuery)
    const inTitle = normalize(a.title).includes(q)
    const inExcerpt = normalize(a.excerpt).includes(q)
    const inTags = a.tags?.some((t) => normalize(t).includes(q))
    return inTitle || inExcerpt || inTags
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'مقالات و راهنماهای تخصصی حقوقی',
        url: `${SITE_URL}/maghalat`,
        hasPart: articles.map((a) => ({
          '@type': 'Article',
          headline: a.title,
          url: `${SITE_URL}/maghalat/${a.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'مقالات حقوقی', item: `${SITE_URL}/maghalat` },
        ],
      },
    ],
  }

  useSEO({
    title: `مقالات و راهنماهای وکیل حقوقی تهران | پرستو خوئینی - ۰۹۱۲۸۷۵۴۱۷۷`,
    description:
      'مقالات تخصصی وکیل حقوقی در تهران درباره دعاوی ملکی، چک و قراردادها؛ نوشته پرستو خوئینی وکیل پایه یک. شماره تماس مشاوره: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).',
    path: '/maghalat',
    jsonLd,
  })

  return (
    <main id="main" className="article-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">مقالات حقوقی</span>
        </nav>

        <div className="section-head center">
          <div className="eyebrow">
            <BookOpen size={14} />
            <span>آموزش و آگاهی‌بخشی حقوقی</span>
          </div>
          <h1 className="section-title">مقالات و راهنماهای وکیل حقوقی در تهران</h1>
          <p className="section-subtitle">
            تحلیل کاربردی رویه‌های قضایی، بررسی نکات کلیدی قراردادها و راهنمای پیشگیری از دعاوی حقوقی و ملکی
          </p>
        </div>

        {/* Search Bar & Instant Filter */}
        <div className="articles-search-box">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="articles-search-input"
              placeholder="جستجو در مقالات (مثال: چک صیادی، سرقفلی، دادخواست، مشارکت در ساخت...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="جستجو در مقالات حقوقی"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="پاک کردن جستجو"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Calculators Teaser Box */}
        <div className="article-calc-callout" style={{ margin: '0 0 32px' }}>
          <div className="calc-callout-icon">
            <Calculator size={22} />
          </div>
          <div className="calc-callout-content">
            <strong>ابزارهای رایگان محاسبه آنلاین حقوقی</strong>
            <p>
              محاسبه آنلاین هزینه دادرسی دادگاه، خسارت تأخیر تأدیه چک بر اساس نرخ تورم بانک مرکزی و مهریه به نرخ روز.
            </p>
          </div>
          <Link to="/mohasebe" className="calc-callout-btn">
            <span>محاسبه آنلاین</span>
            <ChevronLeft size={14} />
          </Link>
        </div>

        <div className="articles-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`article-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'همه مقالات' : cat}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="no-articles-found" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>مقاله‌ای متناسب با عبارت جستجوی شما یافت نشد.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="btn btn-outline-dark"
              style={{ marginTop: 14 }}
            >
              نمایش همه مقالات
            </button>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map((a) => (
              <Link to={`/maghalat/${a.id}`} className="article-card card article-card-link" key={a.id}>
                <div className="article-thumb">
                  <span className="article-cat-badge">{a.category || 'حقوقی'}</span>
                  <div className="article-meta-row">
                    <span className="article-read-time">
                      <Clock size={13} />
                      <span>{a.readTime || '۵ دقیقه'}</span>
                    </span>
                    <span className="article-date">
                      <Calendar size={13} />
                      <span>{a.date}</span>
                    </span>
                  </div>
                </div>
                <div className="article-body">
                  <h2 className="article-title">{a.title}</h2>
                  <p className="article-excerpt">{a.excerpt}</p>
                  <div className="article-footer">
                    <span className="article-read-btn">
                      <span>مطالعه کامل مقاله</span>
                      <ArrowLeft size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
