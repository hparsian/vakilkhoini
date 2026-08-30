import { useState } from 'react'
import { articles, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { BookOpen, Calendar, Clock, ArrowLeft, ChevronLeft } from 'lucide-react'
import '../components/Articles.css'
import './ArticlePage.css'

export default function ArticlesListPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))]
  const filteredArticles = articles.filter((a) => activeCategory === 'all' || a.category === activeCategory)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'مقالات و راهنماهای حقوقی',
    url: `${SITE_URL}/maghalat`,
    hasPart: articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: `${SITE_URL}/maghalat/${a.id}`,
    })),
  }

  useSEO({
    title: `مقالات حقوقی تخصصی | ${lawyer.name}`,
    description:
      'مجموعه مقالات و راهنماهای تخصصی حقوقی درباره دعاوی ملکی، قراردادها، اسناد تجاری، دادخواست و آیین دادرسی توسط پرستو خوئینی وکیل پایه یک دادگستری.',
    path: '/maghalat',
    jsonLd,
    ogType: 'website',
    keywords: 'مقالات حقوقی, راهنمای حقوقی, دعاوی ملکی, قراردادها, اسناد تجاری, آیین دادرسی, دادخواست, وکیل تهران',
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
          <h1 className="section-title">مقالات و راهنماهای تخصصی حقوقی</h1>
          <p className="section-subtitle">
            تحلیل کاربردی رویه‌های قضایی، بررسی نکات کلیدی قراردادها و راهنمای پیشگیری از دعاوی حقوقی و ملکی
          </p>
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

        <div className="articles-view-all">
          <Link to="/" className="btn btn-gold">
            مشاهده خدمات تخصصی حقوقی
          </Link>
          <Link to="/maghalat" className="btn btn-outline-dark">
            مشاهده همه مقالات
          </Link>
        </div>
      </div>
    </main>
  )
}
