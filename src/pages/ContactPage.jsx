import { useState } from 'react'
import { lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { useToast } from '../context/ToastContext.jsx'
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Navigation,
  Sparkles,
  Calendar,
  ChevronLeft,
  Mail,
} from 'lucide-react'
import '../components/Contact.css'
import './ArticlePage.css'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(lawyer.phone)
    setCopied(true)
    showToast('شماره تلفن دفتر در حافظه کپی شد.', 'success')
    setTimeout(() => setCopied(false), 2500)
  }

  const canonicalPath = '/tamas'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}${canonicalPath}#webpage`,
        url: `${SITE_URL}${canonicalPath}`,
        name: `تماس با دفتر وکالت ${lawyer.name} در سعادت‌آباد تهران`,
        description: `آدرس دقیق، شماره تلفن مستقیم، پیام‌رسان واتساپ و موقعیت مکانی دفتر وکالت ${lawyer.name} در سعادت‌آباد میدان کاج تهران.`,
      },
      {
        '@type': 'LegalService',
        name: `دفتر وکالت ${lawyer.name}`,
        telephone: lawyer.phone,
        url: `${SITE_URL}${canonicalPath}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: lawyer.office,
          addressLocality: 'تهران',
          addressRegion: 'تهران',
          postalCode: '19977',
          addressCountry: 'IR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.782,
          longitude: 51.3735,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
            opens: '10:00',
            closes: '20:00',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'تماس و نشانی', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `تماس با وکیل در سعادت‌آباد تهران | نشانی و تلفن دفتر پرستو خوئینی`,
    description: `آدرس دفتر وکالت در سعادت‌آباد میدان کاج تهران، شماره تماس مستقیم ${lawyer.displayPhone}، پیام‌رسان واتساپ و مسیریابی سریع با تعیین وقت قبلی.`,
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
          <span aria-current="page">تماس و نشانی دفتر</span>
        </nav>

        {/* Section Head */}
        <div className="section-head center">
          <div className="eyebrow">
            <MapPin size={14} />
            <span>راه‌های ارتباطی و موقعیت جغرافیایی</span>
          </div>
          <h1 className="section-title">تماس و نشانی دفتر وکالت</h1>
          <p className="section-subtitle">
            پذیرش مراجعین حضوری در محدوده سعادت‌آباد تهران صرفاً با تعیین وقت قبلی صورت می‌پذیرد
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid" style={{ marginBottom: 50 }}>
          {/* Info Card */}
          <div className="contact-card card">
            <div className="contact-card-header">
              <div className="contact-badge">
                <ShieldCheck size={16} />
                <span>پروانه پایه یک کانون وکلای دادگستری استان البرز</span>
              </div>
              <h2 className="contact-name">{lawyer.name}</h2>
              <p className="contact-role">{lawyer.title} | شماره پروانه: {lawyer.licenseNumber}</p>
            </div>

            <ul className="contact-list">
              {/* Phone */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">شماره تماس مستقیم دفتر</span>
                  <div className="contact-phone-row">
                    <a href={lawyer.phoneHref} className="contact-value phone-val phone-number" dir="ltr">
                      {lawyer.displayPhone}
                    </a>
                    <button
                      type="button"
                      onClick={copyPhoneNumber}
                      className="copy-btn"
                      title="کپی شماره تلفن"
                    >
                      {copied ? <Check size={14} className="copied" /> : <Copy size={14} />}
                      <span>{copied ? 'کپی شد' : 'کپی شماره'}</span>
                    </button>
                  </div>
                </div>
              </li>

              {/* Location */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">نشانی دفتر وکالت</span>
                  <span className="contact-value">
                    {lawyer.office}
                  </span>
                </div>
              </li>

              {/* Working Hours */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">ساعات کاری و پاسخگویی تلفنی</span>
                  <span className="contact-value">
                    {lawyer.hours}
                  </span>
                </div>
              </li>
            </ul>

            <div className="contact-actions-bar">
              <a href={lawyer.phoneHref} className="btn btn-gold flex-1">
                <Phone size={17} />
                <span>تماس تلفنی مستقیم</span>
              </a>
              <a
                href={lawyer.whatsappHref}
                className="btn btn-outline-dark flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                <span>پیام در واتساپ</span>
              </a>
            </div>
          </div>

          {/* Map & Directions Visual Card */}
          <div className="contact-map-card card" role="region" aria-label="موقعیت مکانی دفتر در سعادت‌آباد">
            <div className="map-artistic-visual">
              <div className="map-grid-overlay" />
              <div className="map-marker-wrap">
                <div className="map-pulse-ring" />
                <div className="map-pin-badge">
                  <MapPin size={22} className="pin-icon" />
                </div>
                <div className="map-label-tag">
                  <strong>دفتر وکالت {lawyer.name}</strong>
                  <span>تهران، سعادت‌آباد، میدان کاج</span>
                </div>
              </div>
            </div>

            <div className="map-card-footer">
              <div className="map-footer-info">
                <Sparkles size={16} className="sparkle-gold" />
                <span>دسترسی آسان از بزرگراه‌های یادگار امام، چمران و نیایش با موقعیت پارک مناسب</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=35.7820,51.3735`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-direction-btn"
                  style={{ background: 'var(--dark-teal)', color: 'var(--white)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Navigation size={14} />
                  <span>گوگل مپ</span>
                </a>
                <a
                  href="https://nshn.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-direction-btn"
                  style={{ background: 'var(--white)', color: 'var(--dark-teal)', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>نشان / بلد</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="about-cta-card">
          <div className="cta-icon">
            <Calendar size={28} />
          </div>
          <div className="cta-content">
            <h2>قصد حضور در دفتر و دریافت مشاوره را دارید؟</h2>
            <p>
              جهت جلوگیری از معطلی و بررسی با تمرکز بالا بر پرونده شما، لطفاً از قبل وقت مشاوره خود را رزرو فرمایید.
            </p>
          </div>
          <div className="cta-btns">
            <Link to="/moshavere" className="btn btn-gold">
              <Calendar size={16} />
              <span>رزرو آنلاین نوبت مشاوره</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
