import { useState } from 'react'
import { services, serviceCategories, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  Briefcase,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Clock,
  ArrowLeft,
  Scale,
  Calculator,
  PhoneCall,
  Calendar,
} from 'lucide-react'
import '../components/Services.css'
import './ArticlePage.css'

export default function ServicesListPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory)

  const canonicalPath = '/khadamat'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${canonicalPath}#webpage`,
        url: `${SITE_URL}${canonicalPath}`,
        name: `خدمات تخصصی وکالت و مشاوره حقوقی | ${lawyer.name}`,
        description: `ارائه خدمات تخصصی دعاوی ملکی، تنظیم قراردادهای تجاری، وصول مطالبات چک صیادی و داوری حقوقی توسط ${lawyer.name} وکیل پایه یک دادگستری در تهران.`,
      },
      {
        '@type': 'ItemList',
        itemListElement: services.map((s, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: s.title,
            description: s.description,
            url: `${SITE_URL}/khadamat/${s.id}`,
            provider: {
              '@type': 'Attorney',
              name: lawyer.name,
              telephone: lawyer.phone,
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'خدمات تخصصی', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `خدمات تخصصی حقوقی و ملکی در تهران | وکیل پرستو خوئینی`,
    description: `وکالت در دعاوی ملکی، سرقفلی، الزام به تنظیم سند، قراردادهای تجاری و مشارکت، وصول چک و داوری با استراتژی دقیق و تعرفه مصوب توسط وکیل پایه یک دادگستری.`,
    path: canonicalPath,
    jsonLd,
  })

  return (
    <main id="main" className="article-page" style={{ paddingTop: 40, paddingBottom: 90 }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">خدمات تخصصی وکالت</span>
        </nav>

        {/* Section Head */}
        <div className="section-head center">
          <div className="eyebrow">
            <Briefcase size={14} />
            <span>حوزه‌های تخصصی وکالت و مشاوره</span>
          </div>
          <h1 className="section-title">خدمات تخصصی حقوقی و قضایی</h1>
          <p className="section-subtitle">
            ارائه خدمات جامع وکالت در دادگاه‌های تهران، دیوان عالی کشور، تنظیم قراردادهای بازرگانی و داوری اختلافات
          </p>
        </div>

        {/* Teaser to Online Legal Calculators */}
        <div className="article-calc-callout" style={{ margin: '0 0 36px' }}>
          <div className="calc-callout-icon">
            <Calculator size={22} />
          </div>
          <div className="calc-callout-content">
            <strong>نیاز به برآورد هزینه‌های دادرسی یا خسارت دیرکرد پرونده دارید؟</strong>
            <p>
              از ابزارهای رایگان محاسبه آنلاین هزینه دادرسی دادگاه و خسارت تأخیر تأدیه چک بر اساس نرخ تورم بانک مرکزی استفاده کنید.
            </p>
          </div>
          <Link to="/mohasebe" className="calc-callout-btn">
            <span>ابزارهای آنلاین محاسبه</span>
            <ChevronLeft size={14} />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="services-categories" role="tablist">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Detailed Grid */}
        <div className="services-grid" style={{ marginTop: 32 }}>
          {filteredServices.map((service) => (
            <div className="service-card card" key={service.id}>
              <div className="service-card-top">
                <div className="service-icon-box">
                  <Scale size={22} />
                </div>
                <div>
                  <h2 className="service-title" style={{ fontSize: 18 }}>{service.title}</h2>
                  <span className="service-category-tag">
                    {serviceCategories.find((c) => c.id === service.category)?.label || 'حقوقی'}
                  </span>
                </div>
              </div>

              <p className="service-desc">{service.description}</p>

              {service.subServices && service.subServices.length > 0 && (
                <div className="service-subitems">
                  <h3 className="subitems-title">شاخه‌های اصلی پرونده‌ها:</h3>
                  <ul className="subitems-list">
                    {service.subServices.map((sub, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="check-icon" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.timeEstimate && (
                <div className="service-time-box" style={{ marginTop: 14, fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} color="var(--gold-dark)" />
                  <span>تخمین زمان رسیدگی: <strong>{service.timeEstimate}</strong></span>
                </div>
              )}

              <div className="service-card-footer" style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/khadamat/${service.id}`} className="service-read-more" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--dark-teal)', fontSize: 13.5 }}>
                  <span>جزئیات و مدارک لازم</span>
                  <ArrowLeft size={15} />
                </Link>
                <Link to="/moshavere" className="btn btn-gold" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                  <Calendar size={13} />
                  <span>درخواست مشاوره</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="about-cta-card" style={{ marginTop: 60 }}>
          <div className="cta-icon">
            <Briefcase size={28} />
          </div>
          <div className="cta-content">
            <h2>موضوع حقوقی شما در فهرست بالا نیست؟</h2>
            <p>
              بسیاری از دعاوی نیازمند بررسی تخصصی اسناد و اتخاذ استراتژی ترکیبی هستند. جهت ارزیابی اولیه مدارک و راهنمایی تلفنی با دفتر وکالت در تماس باشید.
            </p>
          </div>
          <div className="cta-btns">
            <Link to="/moshavere" className="btn btn-gold">
              <Calendar size={16} />
              <span>رزرو وقت مشاوره</span>
            </Link>
            <a href={lawyer.phoneHref} className="btn btn-outline-light">
              <PhoneCall size={16} />
              <span>{lawyer.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
