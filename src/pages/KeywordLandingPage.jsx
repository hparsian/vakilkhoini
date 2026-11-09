import { useState } from 'react'
import { keywordLandingPages } from '../data/landingPagesData.js'
import { lawyer, articles, services } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import NotFoundPage from './NotFoundPage.jsx'
import {
  Scale,
  Award,
  CheckCircle2,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  MapPin,
  Sparkles,
  Calculator,
  ArrowLeft,
  BookOpen,
  FileCheck2,
  ShieldCheck,
  Building2,
  Briefcase,
  FileText,
  BadgeCheck,
} from 'lucide-react'
import './ArticlePage.css'
import './KeywordLandingPage.css'

export default function KeywordLandingPage({ slug }) {
  const pageData = keywordLandingPages.find((p) => p.slug === slug)
  const [openFaqIdx, setOpenFaqIdx] = useState(0)

  if (!pageData) {
    return <NotFoundPage />
  }

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${pageData.path}/#webpage`,
        url: `${SITE_URL}${pageData.path}`,
        name: pageData.title,
        description: pageData.description,
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'خدمات تخصصی وکالت', item: `${SITE_URL}/khadamat` },
          { '@type': 'ListItem', position: 3, name: pageData.h1, item: `${SITE_URL}${pageData.path}` },
        ],
      },
      {
        '@type': 'LegalService',
        name: `دفتر وکالت پرستو خوئینی - ${pageData.h1}`,
        description: pageData.description,
        url: `${SITE_URL}${pageData.path}`,
        telephone: '+989128754177',
        priceRange: '$$',
        currenciesAccepted: 'IRR',
        paymentAccepted: 'نقدی، کارت به کارت، حواله پایا و ساتنا، چک صیادی',
        hasMap: 'https://maps.google.com/?q=35.7820,51.3735',
        areaServed: [
          { '@type': 'City', name: 'تهران' },
          { '@type': 'AdministrativeArea', name: 'سعادت‌آباد' },
          { '@type': 'AdministrativeArea', name: 'شهرک غرب' },
          { '@type': 'Country', name: 'ایران' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'سعادت‌آباد، میدان کاج، بلوار سرو غربی',
          addressLocality: 'تهران',
          addressRegion: 'تهران',
          postalCode: '19977',
          addressCountry: 'IR',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: pageData.faqs.map((f, idx) => ({
          '@type': 'Question',
          '@id': `${SITE_URL}${pageData.path}#faq-${idx + 1}`,
          name: f.q,
          url: `${SITE_URL}${pageData.path}#faq-${idx + 1}`,
          mainEntityOfPage: `${SITE_URL}${pageData.path}`,
          inLanguage: 'fa-IR',
          answerCount: 1,
          acceptedAnswer: {
            '@type': 'Answer',
            '@id': `${SITE_URL}${pageData.path}#faq-ans-${idx + 1}`,
            text: f.a,
            url: `${SITE_URL}${pageData.path}#faq-${idx + 1}`,
            inLanguage: 'fa-IR',
            author: {
              '@type': 'Person',
              name: lawyer.name,
              jobTitle: lawyer.title,
              sameAs: `${SITE_URL}/darbareh`,
            },
          },
        })),
      },
    ],
  }

  useSEO({
    title: pageData.title,
    description: pageData.description,
    path: pageData.path,
    jsonLd,
  })

  // Select related articles for this keyword
  const relatedArticles = articles.slice(0, 3)

  return (
    <main id="main" className="landing-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <Link to="/khadamat">خدمات تخصصی وکالت</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">{pageData.h1}</span>
        </nav>

        {/* Hero Section */}
        <header className="landing-hero card">
          <div className="landing-hero-content">
            <div className="eyebrow">
              <Award size={14} />
              <span>{pageData.eyebrow}</span>
            </div>
            <h1 className="landing-title">{pageData.h1}</h1>
            <p className="landing-subtitle">{pageData.subtitle}</p>

            <div className="landing-tags-cloud" aria-label="کلمات کلیدی مرتبط">
              {pageData.keywords.map((kw, i) => (
                <span key={i} className="landing-kw-pill">
                  #{kw}
                </span>
              ))}
            </div>

            <div className="landing-hero-actions">
              <a href={lawyer.phoneHref} className="btn btn-gold landing-cta-btn">
                <Phone size={18} />
                <span>تماس مستقیم با وکیل:</span>
                <span className="phone-number" dir="ltr">
                  {lawyer.displayPhone}
                </span>
              </a>
              <Link to="/moshavere" className="btn btn-outline-dark">
                <Calendar size={16} />
                <span>رزرو نوبت مشاوره حضوری در سعادت‌آباد</span>
              </Link>
            </div>
          </div>

          <div className="landing-hero-sidebar">
            <div className="landing-stats-box">
              <div className="stats-box-head">
                <BadgeCheck size={20} />
                <strong>مشخصات و صلاحیت‌های قانونی</strong>
              </div>
              <div className="stats-items-grid">
                {pageData.heroStats.map((st, i) => (
                  <div key={i} className="stat-item-row">
                    <span className="stat-label">{st.label}:</span>
                    <strong className="stat-val">{st.val}</strong>
                  </div>
                ))}
              </div>
              <div className="stats-office-note">
                <MapPin size={15} />
                <span>دفتر تهران: {lawyer.office}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Legal Overview & Strategy */}
        <section className="landing-section card" aria-labelledby="overview-heading">
          <div className="landing-section-head">
            <div className="eyebrow">
              <Scale size={14} />
              <span>تحلیل حقوقی و استراتژی دفاع</span>
            </div>
            <h2 id="overview-heading" className="landing-section-title">
              نگاه تخصصی وکیل پایه یک به پرونده‌های {pageData.h1}
            </h2>
          </div>

          <div className="landing-overview-text">
            {pageData.overviewParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Sub-Services Grid */}
        <section className="landing-section" aria-labelledby="subservices-heading">
          <div className="section-head center">
            <div className="eyebrow">
              <Briefcase size={14} />
              <span>حوزه‌های اجرایی و اقدام</span>
            </div>
            <h2 id="subservices-heading" className="section-title">
              {pageData.subServicesTitle}
            </h2>
          </div>

          <div className="landing-services-grid">
            {pageData.subServices.map((svc, i) => (
              <article key={i} className="landing-service-card card">
                <div className="svc-card-icon">
                  <CheckCircle2 size={22} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Legal Framework & Statutes */}
        <section className="landing-section card" aria-labelledby="statutes-heading">
          <div className="landing-section-head">
            <div className="eyebrow">
              <FileText size={14} />
              <span>مبانی قانونی و آرای وحدت رویه</span>
            </div>
            <h2 id="statutes-heading" className="landing-section-title">
              {pageData.legalFrameworkTitle}
            </h2>
          </div>

          <div className="landing-statutes-list">
            {pageData.legalFramework.map((st, i) => (
              <blockquote key={i} className="statute-quote-card">
                <p>« {st} »</p>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Embedded Calculator Teaser Box */}
        {pageData.calculatorTab && (
          <section className="landing-section landing-calc-teaser card">
            <div className="teaser-content">
              <div className="teaser-icon-wrap">
                <Calculator size={28} />
              </div>
              <div>
                <h3>{pageData.calculatorTitle}</h3>
                <p>{pageData.calculatorDesc}</p>
              </div>
            </div>
            <Link to={`/mohasebe`} className="btn btn-gold teaser-btn">
              <span>ورود به سامانه ابزار آنلاین محاسبه</span>
              <ChevronLeft size={16} />
            </Link>
          </section>
        )}

        {/* FAQ Accordion Section */}
        <section className="landing-section" aria-labelledby="faq-heading">
          <div className="section-head center">
            <div className="eyebrow">
              <HelpCircle size={14} />
              <span>پاسخ به سوالات حقوقی شما</span>
            </div>
            <h2 id="faq-heading" className="section-title">
              پرسش‌های متداول درباره {pageData.h1}
            </h2>
          </div>

          <div className="landing-faq-accordion">
            {pageData.faqs.map((faq, i) => {
              const isOpen = openFaqIdx === i
              return (
                <div key={i} className={`landing-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="landing-faq-trigger"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="landing-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact & Consultation Banner */}
        <section className="landing-cta-banner card" aria-label="دعوت به مشاوره">
          <div className="cta-banner-text">
            <h2>{pageData.ctaTitle}</h2>
            <p>{pageData.ctaDesc}</p>
            <div className="cta-banner-badges">
              <span>
                <MapPin size={14} /> {lawyer.office}
              </span>
              <span>
                <Clock size={14} /> {lawyer.shortHours}
              </span>
            </div>
          </div>
          <div className="cta-banner-buttons">
            <a href={lawyer.phoneHref} className="btn btn-gold">
              <Phone size={16} />
              <span>تماس مستقیم: {lawyer.displayPhone}</span>
            </a>
            <Link to="/moshavere" className="btn btn-outline-light">
              <Calendar size={16} />
              <span>رزرو وقت مشاوره</span>
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="landing-section" aria-label="مقالات مرتبط">
          <div className="section-head center">
            <div className="eyebrow">
              <BookOpen size={14} />
              <span>راهنماها و مقالات حقوقی</span>
            </div>
            <h2 className="section-title">مطالعه بیشتر درباره قوانین و رویه‌ها</h2>
          </div>
          <div className="landing-articles-grid">
            {relatedArticles.map((art) => (
              <article key={art.id} className="landing-article-card card">
                <span className="article-cat-badge">{art.category}</span>
                <h3>
                  <Link to={`/maghalat/${art.id}`}>{art.title}</Link>
                </h3>
                <p>{art.excerpt}</p>
                <Link to={`/maghalat/${art.id}`} className="article-read-link">
                  <span>مطالعه مقاله</span>
                  <ArrowLeft size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
