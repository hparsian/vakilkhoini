import { useEffect } from 'react'
import { articles, lawyer } from '../data/content.js'
import { relatedArticles as getRelatedArticles, relatedServices as getRelatedServices } from '../data/related.js'
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
  Scale,
  MapPin,
  Phone,
  HelpCircle,
} from 'lucide-react'
import './ArticlePage.css'

// Related content is scored from the content itself — see src/data/related.js.

// Semantic content renderer for headings, lists, and paragraphs
function renderArticleContent(text) {
  if (!text) return null
  const blocks = text.split('\n\n')

  return blocks.map((block, idx) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    // Markdown style headings
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="reader-section-h3">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      )
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="reader-section-h2">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      )
    }

    // Single line questions or section titles ending in ؟ or :
    if (
      !trimmed.includes('\n') &&
      trimmed.length < 90 &&
      (trimmed.endsWith('؟') || trimmed.endsWith(':'))
    ) {
      return (
        <h2 key={idx} className="reader-section-h2">
          {trimmed.replace(/:$/, '')}
        </h2>
      )
    }

    // Check if block is a bulleted list
    const lines = trimmed.split('\n')
    const isBulletList =
      lines.length > 1 &&
      lines.every((l) => l.trim().startsWith('-') || l.trim().startsWith('•'))
    if (isBulletList) {
      return (
        <ul key={idx} className="reader-list bullet-list">
          {lines.map((l, lIdx) => (
            <li key={lIdx}>{l.replace(/^[-•]\s*/, '')}</li>
          ))}
        </ul>
      )
    }

    // Check if block is a numbered list
    const isNumberedList =
      lines.length > 1 &&
      lines.every((l) => /^[۰-۹0-9]+[.-]/.test(l.trim()))
    if (isNumberedList) {
      return (
        <ol key={idx} className="reader-list numbered-list">
          {lines.map((l, lIdx) => (
            <li key={lIdx}>{l.replace(/^[۰-۹0-9]+[.-]\s*/, '')}</li>
          ))}
        </ol>
      )
    }

    // Regular paragraph
    return (
      <p key={idx} className="reader-paragraph">
        {lines.map((line, lIdx) => (
          <span key={lIdx}>
            {line}
            {lIdx < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    )
  })
}

export default function ArticlePage({ slug }) {
  const article = articles.find((a) => a.id === slug)
  const { showToast } = useToast()

  // Replace browser URL state if visited via old alias
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('ghoulnameh-vs-mobayeenameh')) {
      window.history.replaceState(null, '', '/maghalat/gholnameh-vs-mobayenameh')
    }
  }, [])

  const canonicalPath = article ? `/maghalat/${article.id}` : '/maghalat'
  const jsonLd = article ? {
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
          '@type': 'LegalService',
          name: `دفتر وکالت ${lawyer.name}`,
          telephone: lawyer.phone,
          url: SITE_URL,
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
      ...(article.faqs && article.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${canonicalPath}#faq`,
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }] : []),
    ],
  } : null

  useSEO({
    title: article ? `${article.title} | وکیل تهران | ${lawyer.name} - ۰۹۱۲۸۷۵۴۱۷۷` : `مقاله یافت نشد | ${lawyer.name}`,
    description: article ? `${article.excerpt} (تحلیل حقوقی ${lawyer.name} وکیل پایه یک در تهران - تماس: ۰۹۱۲۸۷۵۴۱۷۷)` : 'مقاله موردنظر یافت نشد.',
    path: canonicalPath,
    jsonLd,
    noindex: !article,
  })

  if (!article) {
    return <ArticleNotFound />
  }

  const relatedArticles = getRelatedArticles(article, 4)
  const relatedServices = getRelatedServices(article, 3)

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
            {renderArticleContent(article.fullContent || article.content || article.excerpt)}

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

            {article.faqs && article.faqs.length > 0 && (
              <section className="reader-faqs-box" aria-label="پرسش و پاسخ‌های متداول مقاله" style={{ marginTop: '28px', marginBottom: '28px' }}>
                <h2 className="reader-section-h2" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.25rem' }}>
                  <HelpCircle size={20} style={{ color: 'var(--gold)' }} />
                  <span>پرسش و پاسخ‌های متداول و پرتکرار</span>
                </h2>
                <div className="article-faqs-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {article.faqs.map((faq, idx) => (
                    <details key={idx} className="article-faq-item card" style={{ padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }} open={idx === 0}>
                      <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--dark-teal)', outline: 'none' }}>
                        {faq.q}
                      </summary>
                      <p style={{ marginTop: '10px', color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '0.95rem' }}>
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
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
                      '_blank',
                      'noopener,noreferrer'
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
                      '_blank',
                      'noopener,noreferrer'
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
                      '_blank',
                      'noopener,noreferrer'
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
                      '_blank',
                      'noopener,noreferrer'
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

            {/* High-Converting Legal Consultation CTA Card */}
            <div className="article-consultation-cta" role="complementary" aria-label="مشاوره با وکیل پایه یک">
              <div className="cta-kicker-badge">
                <Scale size={14} />
                <span>ارزیابی شانس موفقیت پرونده قبل از هزینه و طرح دعوا</span>
              </div>
              <h3 className="cta-headline">نیاز به بررسی تخصصی اسناد و دادخواست خود دارید؟</h3>
              <p className="cta-body-text">
                یک اشتباه در انتخاب عنوان دادخواست یا تقدیم دیرهنگام لایحه، می‌تواند ماه‌ها دادرسی را به بن‌بست بکشاند. 
                <strong> سرکار خانم {lawyer.name}</strong> ({lawyer.title} در سعادت‌آباد تهران)، پس از بررسی دقیق اسناد و مدارک، شفاف‌ترین استراتژی دفاعی و شانس واقعی پرونده را در اختیارتان می‌گذارد.
              </p>
              <div className="cta-bottom-row">
                <div className="cta-office-info">
                  <span className="cta-address">
                    <MapPin size={13} />
                    <span>{lawyer.office}</span>
                  </span>
                  <span className="cta-note">{lawyer.shortHours}</span>
                </div>
                <div className="cta-action-buttons">
                  <a href={lawyer.phoneHref} className="cta-call-btn" title="تماس تلفنی مستقیم">
                    <Phone size={15} />
                    <span>تماس مستقیم: </span>
                    <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
                  </a>
                  <a href={lawyer.whatsappHref} target="_blank" rel="noopener noreferrer" className="cta-whatsapp-btn" title="ارسال پیام در واتساپ">
                    <MessageCircle size={15} />
                    <span>مشاوره در واتساپ</span>
                  </a>
                  <Link to="/moshavere" className="cta-booking-btn">
                    <Calendar size={15} />
                    <span>رزرو وقت حضوری</span>
                  </Link>
                </div>
              </div>
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
