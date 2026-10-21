import { services, lawyer } from '../data/content.js'
import {
  relatedArticlesForService as getRelatedArticles,
  relatedServicesForService,
} from '../data/related.js'
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

export default function ServicePage({ slug }) {
  const service = services.find((s) => s.id === slug)

  const canonicalPath = service ? `/khadamat/${service.id}` : '/'
  const jsonLd = service ? {
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
          { '@type': 'ListItem', position: 2, name: 'خدمات تخصصی', item: `${SITE_URL}/khadamat` },
          { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  } : null

  useSEO({
    title: service ? `${service.title} | ${lawyer.name} وکیل پایه یک دادگستری - ۰۹۱۲۸۷۵۴۱۷۷` : `خدمت یافت نشد | ${lawyer.name}`,
    description: service ? `${service.title} در تهران توسط ${lawyer.name} وکیل پایه یک دادگستری. شماره تماس مستقیم: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177). ${service.description}` : 'خدمت موردنظر یافت نشد.',
    path: canonicalPath,
    jsonLd,
    noindex: !service,
  })

  if (!service) {
    return <ServiceNotFound />
  }

  const relatedArticles = getRelatedArticles(service, 4)
  const relatedServices = relatedServicesForService(service, 3)

  return (
    <main id="main" className="article-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link to="/khadamat">خدمات تخصصی</Link>
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
            <Link to="/moshavere" className="btn btn-gold">
              <Calendar size={16} />
              <span>درخواست مشاوره برای {service.title}</span>
            </Link>
            <Link to="/khadamat" className="btn btn-outline-dark">
              مشاهده سایر خدمات
            </Link>
          </div>

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

          {relatedServices.length > 0 && (
            <section className="related-block" aria-label="سایر خدمات مرتبط">
              <h2 className="related-title">سایر خدمات مرتبط</h2>
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
        </article>
      </div>
    </main>
  )
}

function ServiceNotFound() {
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
