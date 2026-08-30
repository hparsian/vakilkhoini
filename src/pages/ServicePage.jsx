import { services, articles, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  CheckCircle2,
  FileSpreadsheet,
  Clock,
  Calendar,
  ChevronLeft,
} from 'lucide-react'
import './ArticlePage.css'

function getRelatedArticles(service) {
  return articles.filter((a) => a.category === service.category).slice(0, 3)
}

export default function ServicePage({ slug }) {
  const service = services.find((s) => s.id === slug)

  if (!service) {
    return <ServiceNotFound />
  }

  const canonicalPath = `/khadamat/${service.id}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        name: service.title,
        description: service.fullDesc || service.description,
        provider: {
          '@type': 'Attorney',
          name: lawyer.name,
          jobTitle: lawyer.title,
          areaServed: lawyer.city,
        },
        areaServed: 'تهران',
        url: `${SITE_URL}${canonicalPath}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'خدمات تخصصی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `${service.title} | وکیل تهران | ${lawyer.name}`,
    description: service.fullDesc || service.description,
    path: canonicalPath,
    jsonLd,
    ogType: 'website',
    keywords: `${service.title}, وکیل تهران, ${service.subServices?.join(', ') || ''}`,
  })

  const relatedArticles = getRelatedArticles(service)
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <main id="main" className="article-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link to="/">خدمات تخصصی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">{service.title}</span>
        </nav>

        <article className="article-page-body">
          <header className="article-page-header">
            <div className="reader-meta">
              <span className="reader-cat">{service.category}</span>
            </div>
            <h1 className="article-page-title">{service.title}</h1>
            <p className="reader-paragraph service-lead">{service.description}</p>
          </header>

          <div className="reader-body">
            {service.fullDesc && <p className="reader-paragraph">{service.fullDesc}</p>}

            {service.subServices && service.subServices.length > 0 && (
              <div className="modal-section-block">
                <h2 className="modal-section-heading">
                  <CheckCircle2 size={17} />
                  <span>انواع پرونده‌ها و دعاوی مرتبط</span>
                </h2>
                <ul className="modal-bullet-list">
                  {service.subServices.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.requiredDocs && service.requiredDocs.length > 0 && (
              <div className="modal-section-block">
                <h2 className="modal-section-heading">
                  <FileSpreadsheet size={17} />
                  <span>مدارک اولیه مورد نیاز جهت بررسی</span>
                </h2>
                <ul className="modal-bullet-list docs">
                  {service.requiredDocs.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.timeEstimate && (
              <div className="modal-timeframe-box">
                <Clock size={16} />
                <span>
                  <strong>مدت زمان تقریبی پیگیری:</strong> {service.timeEstimate}
                </span>
              </div>
            )}
          </div>

          <div className="reader-footer">
            <Link to="/#consultation" className="btn btn-gold">
              <Calendar size={16} />
              <span>درخواست مشاوره برای {service.title}</span>
            </Link>
            <Link to="/#services" className="btn btn-outline-dark">
              مشاهده سایر خدمات
            </Link>
          </div>

          {otherServices.length > 0 && (
            <section className="related-block" aria-label="سایر خدمات">
              <h2 className="related-title">سایر خدمات حقوقی</h2>
              <div className="related-services-list">
                {otherServices.map((s) => (
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
              <h2 className="related-title">مقالات مرتبط با این خدمت</h2>
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

function ServiceNotFound() {
  useSEO({
    title: `خدمت یافت نشد | ${lawyer.name}`,
    description: 'خدمت موردنظر یافت نشد.',
    path: '/',
    noindex: true,
  })
  return (
    <main id="main" className="article-page">
      <div className="container article-not-found">
        <h1>خدمت موردنظر یافت نشد</h1>
        <Link to="/" className="btn btn-gold">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  )
}
