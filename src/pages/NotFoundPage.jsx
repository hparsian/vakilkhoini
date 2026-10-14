import { useState, useMemo } from 'react'
import { Link, useRouter } from '../router.jsx'
import { articles, services, lawyer } from '../data/content.js'
import useSEO from '../hooks/useSEO.js'
import {
  FileQuestion,
  Search,
  Home,
  Calculator,
  Briefcase,
  BookOpen,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { navigate } = useRouter()

  useSEO({
    title: `صفحه مورد نظر یافت نشد (خطای ۴۰۴) | ${lawyer.name}`,
    description: 'صفحه مورد نظر شما در وب‌سایت دفتر وکالت پرستو خوئینی یافت نشد. می‌توانید از جستجو یا پیوندهای سریع زیر استفاده کنید.',
    path: '/404',
    noindex: true,
  })

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q || q.length < 2) return { articles: [], services: [] }

    const matchedArticles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q)),
    ).slice(0, 4)

    const matchedServices = services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    ).slice(0, 3)

    return { articles: matchedArticles, services: matchedServices }
  }, [searchQuery])

  const topArticles = useMemo(() => {
    // Featured articles for quick discovery
    return articles.slice(0, 3)
  }, [])

  return (
    <main id="main" className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-hero">
          <div className="not-found-badge">
            <ShieldAlert size={18} className="badge-icon" />
            <span>خطای ۴۰۴ — صفحه در دسترس نیست</span>
          </div>

          <h1 className="not-found-title">صفحه مورد نظر شما پیدا نشد</h1>
          <p className="not-found-desc">
            ممکن است آدرس وارد شده تغییر کرده باشد، صفحه به آدرس دیگری منتقل شده باشد یا موقتاً در دسترس نباشد.
          </p>

          {/* Interactive Search Bar */}
          <div className="not-found-search-box" role="search">
            <Search size={20} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              className="not-found-input"
              placeholder="جستجو در موضوعات حقوقی (مثال: چک صیادی، مبایعه‌نامه، هزینه دادرسی...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="جستجوی موضوعات حقوقی در سایت"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="پاک کردن جستجو"
              >
                ✕
              </button>
            )}
          </div>

          {/* Real-time search results */}
          {searchQuery.trim().length >= 2 && (
            <div className="not-found-results" aria-live="polite">
              {searchResults.services.length === 0 && searchResults.articles.length === 0 ? (
                <p className="no-results-msg">موردی با عبارت «{searchQuery}» یافت نشد. پیوندهای زیر را امتحان کنید.</p>
              ) : (
                <div className="results-grid">
                  {searchResults.services.length > 0 && (
                    <div className="results-col">
                      <span className="results-group-title">خدمات حقوقی مرتبط:</span>
                      <ul className="results-list">
                        {searchResults.services.map((s) => (
                          <li key={s.id}>
                            <Link to={`/khadamat/${s.id}`} className="result-link">
                              <Briefcase size={16} />
                              <span>{s.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.articles.length > 0 && (
                    <div className="results-col">
                      <span className="results-group-title">مقالات و راهنماهای حقوقی:</span>
                      <ul className="results-list">
                        {searchResults.articles.map((a) => (
                          <li key={a.id}>
                            <Link to={`/maghalat/${a.id}`} className="result-link">
                              <BookOpen size={16} />
                              <span>{a.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Hub Links */}
        <section className="not-found-quick-links" aria-label="بخش‌های پربازدید">
          <h2 className="quick-links-title">بخش‌های اصلی و پرکاربرد وب‌سایت</h2>
          <div className="quick-links-grid">
            <Link to="/" className="quick-link-card">
              <div className="card-icon-wrap gold">
                <Home size={22} />
              </div>
              <div className="card-info">
                <strong>صفحه اصلی</strong>
                <span>بازگشت به معرفی و دسترسی کامل</span>
              </div>
            </Link>

            <Link to="/mohasebe" className="quick-link-card">
              <div className="card-icon-wrap teal">
                <Calculator size={22} />
              </div>
              <div className="card-info">
                <strong>ابزارهای محاسبه حقوقی</strong>
                <span>هزینه دادرسی، تاخیر تادیه و ریسک مبایعه‌نامه</span>
              </div>
            </Link>

            <Link to="/khadamat" className="quick-link-card">
              <div className="card-icon-wrap gold">
                <Briefcase size={22} />
              </div>
              <div className="card-info">
                <strong>خدمات تخصصی وکالت</strong>
                <span>دعاوی ملکی، اسناد تجاری و تنظیم قرارداد</span>
              </div>
            </Link>

            <Link to="/maghalat" className="quick-link-card">
              <div className="card-icon-wrap teal">
                <BookOpen size={22} />
              </div>
              <div className="card-info">
                <strong>پایگاه مقالات حقوقی</strong>
                <span>آموزش کاربردی قوانین و آیین دادرسی</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Recommended Top Guides */}
        <section className="not-found-articles" aria-label="مقالات پیشنهادی">
          <h2 className="quick-links-title">راهنماهای حقوقی پربازدید</h2>
          <div className="featured-articles-grid">
            {topArticles.map((art) => (
              <article key={art.id} className="nf-article-card">
                <span className="nf-cat-tag">{art.category}</span>
                <h3 className="nf-art-title">
                  <Link to={`/maghalat/${art.id}`}>{art.title}</Link>
                </h3>
                <p className="nf-art-desc">{art.excerpt}</p>
                <Link to={`/maghalat/${art.id}`} className="nf-art-link">
                  <span>مطالعه مقاله</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Direct Call / Contact Banner */}
        <div className="not-found-contact-box">
          <div className="contact-box-content">
            <PhoneCall size={28} className="contact-box-icon" />
            <div>
              <h3>نیاز به مشاوره حقوقی فوری دارید؟</h3>
              <p>جهت بررسی فوری پرونده یا تعیین وقت مشاوره در دفتر سعادت‌آباد تماس حاصل فرمایید.</p>
            </div>
          </div>
          <div className="contact-box-actions">
            <a
              href={`tel:${lawyer.phone}`}
              className="btn btn-gold"
              aria-label={`تماس مستقیم با شماره ${lawyer.phone}`}
            >
              <span>تماس مستقیم:</span>
              <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
            </a>
            <Link to="/moshavere" className="btn btn-outline">
              درخواست نوبت مشاوره
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
