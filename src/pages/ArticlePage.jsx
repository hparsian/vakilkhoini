import { articles, services, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { useToast } from '../context/ToastContext.jsx'
import {
  Calendar,
  Clock,
  Share2,
  PhoneCall,
  Sparkles,
  ChevronLeft,
  Tag,
  Calculator,
  Copy,
  MessageCircle,
} from 'lucide-react'
import './ArticlePage.css'

// Simple relatedness: same category first, otherwise first N others.
function getRelatedArticles(current) {
  const sameCategory = articles.filter((a) => a.id !== current.id && a.category === current.category)
  const rest = articles.filter((a) => a.id !== current.id && a.category !== current.category)
  return [...sameCategory, ...rest].slice(0, 3)
}

// Very small keyword map to suggest relevant services under each article.
function getRelatedServices(article) {
  const text = `${article.title} ${article.tags?.join(' ') || ''}`
  const scored = services.map((s) => {
    let score = 0
    if (s.category === article.category) score += 1
    const keywords = [s.title, ...(s.subServices || [])].join(' ')
    article.tags?.forEach((t) => {
      if (keywords.includes(t) || text.includes(s.title)) score += 1
    })
    return { s, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2).map((x) => x.s)
}

export default function ArticlePage({ slug }) {
  const article = articles.find((a) => a.id === slug)
  const { showToast } = useToast()

  if (!article) {
    return <ArticleNotFound />
  }

  const canonicalPath = `/maghalat/${article.id}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
          '@type': 'Person',
          name: lawyer.name,
          jobTitle: lawyer.title,
        },
        publisher: {
          '@type': 'Organization',
          name: `دفتر وکالت ${lawyer.name}`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}${canonicalPath}`,
        },
        keywords: article.tags?.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'مقالات حقوقی', item: `${SITE_URL}/maghalat` },
          { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `${article.title} | ${lawyer.name}`,
    description: article.excerpt,
    path: canonicalPath,
    jsonLd,
  })

  const relatedArticles = getRelatedArticles(article)
  const relatedServices = getRelatedServices(article)

  const handleShare = () => {
    const url = `${SITE_URL}${canonicalPath}`
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.excerpt, url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      showToast('لینک مقاله در حافظه کپی شد', 'success')
    }
  }

  return (
    <main id="main" className="article-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link to="/maghalat">مقالات حقوقی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">{article.title}</span>
        </nav>

        <article className="article-page-body">
          <header className="article-page-header">
            <div className="reader-meta">
              <span className="reader-cat">{article.category}</span>
              <span className="reader-date">
                <Calendar size={14} />
                <span>{article.date}</span>
              </span>
              <span className="reader-time">
                <Clock size={14} />
                <span>زمان مطالعه: {article.readTime || '۵ دقیقه'}</span>
              </span>
            </div>

            <h1 className="article-page-title">{article.title}</h1>

            <div className="reader-author-row">
              <div className="author-info">
                <Sparkles size={16} className="author-icon" />
                <span>
                  نویسنده و تحلیل‌گر حقوقی: <strong>{lawyer.name}</strong> ({lawyer.title})
                </span>
              </div>
              <button type="button" onClick={handleShare} className="share-article-btn" title="اشتراک‌گذاری">
                <Share2 size={16} />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>
          </header>

          <div className="reader-body">
            {(article.fullContent || article.content || article.excerpt)
              .split('\n\n')
              .map((para, i) => (
                <p key={i} className="reader-paragraph">
                  {para}
                </p>
              ))}

            {article.takeaways && article.takeaways.length > 0 && (
              <div className="reader-takeaways-box">
                <h2 className="takeaways-title">نکات و توصیه‌های کلیدی:</h2>
                <ul className="takeaways-list">
                  {article.takeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="reader-lawyer-note">
              <h2>نکته کلیدی حقوقی:</h2>
              <p>
                هر پرونده دارای جزئیات اسنادی و زمانی منحصر‌به‌فرد است. توصیه می‌شود پیش از هرگونه اقدام
                حقوقی، ارسال اظهارنامه یا طرح دعوا در دادگاه، اسناد خود را با وکیل متخصص بررسی نمایید.
              </p>
            </div>

            {article.tags && (
              <div className="article-tags article-page-tags">
                {article.tags.map((t, idx) => (
                  <span className="article-tag" key={idx}>
                    <Tag size={12} />
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Bar */}
            <div className="article-share-section">
              <div className="share-section-title">
                <Share2 size={16} />
                <span>اشتراک‌گذاری این مطلب با دیگران:</span>
              </div>
              <div className="share-buttons-grid">
                <button
                  type="button"
                  className="share-btn-pill whatsapp"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        article.title + '\n' + SITE_URL + canonicalPath
                      )}`,
                      '_blank'
                    )
                  }
                  title="اشتراک‌گذاری در واتساپ"
                >
                  <MessageCircle size={15} />
                  <span>واتساپ</span>
                </button>
                <button
                  type="button"
                  className="share-btn-pill telegram"
                  onClick={() =>
                    window.open(
                      `https://t.me/share/url?url=${encodeURIComponent(
                        SITE_URL + canonicalPath
                      )}&text=${encodeURIComponent(article.title)}`,
                      '_blank'
                    )
                  }
                  title="اشتراک‌گذاری در تلگرام"
                >
                  <span>تلگرام</span>
                </button>
                <button
                  type="button"
                  className="share-btn-pill eitaa"
                  onClick={() =>
                    window.open(
                      `https://eitaa.com/share/url?url=${encodeURIComponent(
                        SITE_URL + canonicalPath
                      )}&text=${encodeURIComponent(article.title)}`,
                      '_blank'
                    )
                  }
                  title="اشتراک‌گذاری در ایتا"
                >
                  <span>ایتا</span>
                </button>
                <button
                  type="button"
                  className="share-btn-pill bale"
                  onClick={() =>
                    window.open(
                      `https://ble.ir/share/url?url=${encodeURIComponent(
                        SITE_URL + canonicalPath
                      )}&text=${encodeURIComponent(article.title)}`,
                      '_blank'
                    )
                  }
                  title="اشتراک‌گذاری در بله"
                >
                  <span>بله</span>
                </button>
                <button
                  type="button"
                  className="share-btn-pill copy"
                  onClick={handleShare}
                  title="کپی لینک مقاله"
                >
                  <Copy size={15} />
                  <span>کپی لینک</span>
                </button>
              </div>
            </div>

            {/* Cross-Link to Legal Calculators */}
            <div className="article-calc-callout">
              <div className="calc-callout-icon">
                <Calculator size={22} />
              </div>
              <div className="calc-callout-content">
                <strong>نیاز به محاسبه آنلاین هزینه دادرسی یا خسارت تأخیر تأدیه دارید؟</strong>
                <p>
                  از ابزارهای رایگان و هوشمند وب‌سایت برای برآورد هزینه‌های دادرسی و محاسبه کاهش ارزش پول استفاده نمایید.
                </p>
              </div>
              <Link to="/mohasebe" className="calc-callout-btn">
                <span>ورود به ابزار محاسبه</span>
                <ChevronLeft size={14} />
              </Link>
            </div>
          </div>

          <div className="reader-footer">
            <Link to="/moshavere" className="btn btn-gold">
              <PhoneCall size={16} />
              <span>مشاوره تخصصی با {lawyer.name} در این زمینه</span>
            </Link>
            <Link to="/maghalat" className="btn btn-outline-dark">
              مشاهده سایر مقالات
            </Link>
          </div>

          {relatedServices.length > 0 && (
            <section className="related-block" aria-label="خدمات مرتبط">
              <h2 className="related-title">خدمات تخصصی مرتبط</h2>
              <div className="related-services-list">
                {relatedServices.map((s) => (
                  <Link to={`/khadamat/${s.id}`} key={s.id} className="related-service-card">
                    <span className="related-service-title">{s.title}</span>
                    <span className="related-service-desc">{s.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedArticles.length > 0 && (
            <section className="related-block" aria-label="مقالات مرتبط">
              <h2 className="related-title">مقالات مرتبط</h2>
              <div className="related-articles-list">
                {relatedArticles.map((a) => (
                  <Link to={`/maghalat/${a.id}`} key={a.id} className="related-article-card">
                    <span className="related-article-cat">{a.category}</span>
                    <span className="related-article-title">{a.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}

function ArticleNotFound() {
  useSEO({
    title: `مقاله یافت نشد | ${lawyer.name}`,
    description: 'مقاله موردنظر یافت نشد.',
    path: '/maghalat',
    noindex: true,
  })
  return (
    <main id="main" className="article-page">
      <div className="container article-not-found">
        <h1>مقاله موردنظر یافت نشد</h1>
        <p>ممکن است آدرس اشتباه باشد یا این مقاله حذف شده باشد.</p>
        <Link to="/maghalat" className="btn btn-gold">
          مشاهده تمام مقالات
        </Link>
      </div>
    </main>
  )
}
