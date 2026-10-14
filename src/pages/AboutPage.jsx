import { lawyer, trustItems, whyChooseMe } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  Award,
  Shield,
  Search,
  Lock,
  Scale,
  Calendar,
  PhoneCall,
  CheckCircle2,
  ChevronLeft,
  FileCheck2,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react'
import '../components/About.css'
import '../components/WhyChooseMe.css'
import './AboutPage.css'

export default function AboutPage() {
  const canonicalPath = '/darbareh'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}${canonicalPath}#webpage`,
        url: `${SITE_URL}${canonicalPath}`,
        name: `درباره ${lawyer.name} | وکیل پایه یک دادگستری در تهران`,
        description: `معرفی کامل سوابق، تخصص‌ها، رویکرد اخلاقی و پروانه وکالت ${lawyer.name} عضو کانون وکلای دادگستری استان البرز در سعادت‌آباد تهران.`,
      },
      {
        '@type': 'Attorney',
        '@id': `${SITE_URL}#attorney`,
        name: lawyer.name,
        jobTitle: lawyer.title,
        description: lawyer.bio,
        telephone: lawyer.phone,
        url: SITE_URL,
        memberOf: {
          '@type': 'Organization',
          name: lawyer.barAssociation,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: lawyer.office,
          addressLocality: lawyer.city,
          addressRegion: 'تهران',
          addressCountry: 'IR',
        },
        knowsAbout: [
          'دعاوی ملکی و ثبتی',
          'تنظیم و بازبینی قراردادهای تجاری',
          'اسناد تجاری و وصول مطالبات چک صیادی',
          'داوری حقوقی و حل اختلافات',
          'دفاع در دادگاه‌های تجدیدنظر و دیوان عالی کشور',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'درباره وکیل', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `درباره پرستو خوئینی | وکیل پایه یک دادگستری در تهران و سعادت‌آباد`,
    description: `آشنایی با سوابق، پروانه وکالت، ارزش‌های حرفه‌ای و رویکرد دفاعی پرستو خوئینی وکیل پایه یک دادگستری و مشاور حقوقی در دعاوی ملکی، مالی و قراردادها.`,
    path: canonicalPath,
    jsonLd,
  })

  const getTrustIcon = (iconName) => {
    switch (iconName) {
      case 'award':
        return <Award size={24} />
      case 'shield':
        return <Shield size={24} />
      case 'search':
        return <Search size={24} />
      case 'lock':
        return <Lock size={24} />
      default:
        return <CheckCircle2 size={24} />
    }
  }

  return (
    <main id="main" className="about-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">درباره وکیل</span>
        </nav>

        {/* Hero Banner */}
        <section className="about-page-hero">
          <div className="about-hero-grid">
            <div className="about-hero-info">
              <div className="eyebrow">
                <Sparkles size={14} />
                <span>سوابق و صلاحیت‌های حرفه‌ای</span>
              </div>
              <h1 className="about-page-title">
                {lawyer.name}؛ {lawyer.title}
              </h1>
              <p className="about-subtitle">{lawyer.subfield}</p>

              <div className="about-license-card">
                <div className="license-icon">
                  <Scale size={24} />
                </div>
                <div className="license-details">
                  <strong>عضو کانون وکلای دادگستری</strong>
                  <span>شماره پروانه رسمی وکالت: {lawyer.licenseNumber}</span>
                  <small>صلاحیت عام وکالت در کلیه محاکم دادگستری و دیوان عالی کشور</small>
                </div>
              </div>

              <p className="about-bio-text">{lawyer.bio}</p>

              <div className="about-quick-bullets">
                <div className="bullet-item">
                  <CheckCircle2 size={18} className="bullet-icon" />
                  <span>بررسی واقع‌بینانه مدارک و شانس موفقیت پرونده قبل از پذیرش</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={18} className="bullet-icon" />
                  <span>انعقاد قرارداد الکترونیک شفاف در سامانه خودکاربری ثنا</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle2 size={18} className="bullet-icon" />
                  <span>گزارش‌دهی مستمر و اطلاع‌رسانی گام‌به‌گام به موکل پس از هر جلسه دادرسی</span>
                </div>
              </div>

              <div className="about-hero-actions">
                <Link to="/moshavere" className="btn btn-gold">
                  <Calendar size={16} />
                  <span>درخواست وقت مشاوره حضوری یا تلفنی</span>
                </Link>
                <Link to="/khadamat" className="btn btn-outline-dark">
                  <span>مشاهده خدمات تخصصی</span>
                </Link>
              </div>
            </div>

            <div className="about-hero-side">
              <div className="about-credentials-box card">
                <div className="cred-badge">
                  <FileCheck2 size={20} />
                  <span>مشخصات و مجوزهای قانونی</span>
                </div>
                <ul className="cred-list">
                  <li>
                    <span className="cred-label">نام و نام خانوادگی:</span>
                    <strong>{lawyer.name}</strong>
                  </li>
                  <li>
                    <span className="cred-label">درجه وکالت:</span>
                    <strong className="gold-text">{lawyer.title}</strong>
                  </li>
                  <li>
                    <span className="cred-label">مرجع صدور پروانه:</span>
                    <span>{lawyer.barAssociation}</span>
                  </li>
                  <li>
                    <span className="cred-label">محدوده دفتر وکالت:</span>
                    <span>
                      <MapPin size={13} style={{ display: 'inline', marginLeft: 4 }} />
                      {lawyer.city}، {lawyer.region}
                    </span>
                  </li>
                  <li>
                    <span className="cred-label">ساعات پذیرش مراجعین:</span>
                    <span>
                      <Clock size={13} style={{ display: 'inline', marginLeft: 4 }} />
                      {lawyer.shortHours}
                    </span>
                  </li>
                </ul>

                <div className="cred-quote">
                  <blockquote>
                    «وکالت دادگستری برای ما صرفاً دفاع در دادگاه نیست؛ ایجاد امنیت خاطر، شفافیت در مواجهه با قانون و صیانت همه‌جانبه از حقوق و سرمایه موکل است.»
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars & Trust Items */}
        <section className="about-pillars-section">
          <div className="section-head center">
            <h2 className="section-title">چهار اصل خدشه‌ناپذیر در دفتر وکالت</h2>
            <p className="section-subtitle">
              اصولی که فعالیت حرفه‌ای و رابطه با موکلین بر پایه آن‌ها استوار شده است
            </p>
          </div>

          <div className="pillars-grid">
            {trustItems.map((item, idx) => (
              <div className="pillar-card card" key={idx}>
                <div className="pillar-icon-box">{getTrustIcon(item.icon)}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Me Detailed Section */}
        <section className="about-why-section">
          <div className="section-head center">
            <h2 className="section-title">چرا موکلین به ما اعتماد می‌کنند؟</h2>
            <p className="section-subtitle">
              رویکرد علمی، اخلاق‌مدارانه و مستند در پیگیری پرونده‌های حساس ملکی و تجاری
            </p>
          </div>

          <div className="about-why-grid">
            {whyChooseMe.map((item, idx) => (
              <div className="why-card card" key={idx}>
                <span className="why-badge">{item.badge}</span>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Callout */}
        <section className="about-cta-section">
          <div className="about-cta-card">
            <div className="cta-icon">
              <Scale size={28} />
            </div>
            <div className="cta-content">
              <h2>نیاز به بررسی تخصصی اسناد و پرونده حقوقی خود دارید؟</h2>
              <p>
                پیش از هر اقدام قضایی، در جلسه مشاوره با وکیل پایه یک از شانس موفقیت، هزینه‌ها و سریع‌ترین مسیر قانونی آگاه شوید.
              </p>
            </div>
            <div className="cta-btns">
              <Link to="/moshavere" className="btn btn-gold">
                <Calendar size={16} />
                <span>تعیین وقت مشاوره</span>
              </Link>
              <a
                href={lawyer.phoneHref}
                className="btn btn-outline-light"
                aria-label={`تماس مستقیم با شماره ${lawyer.phone}`}
              >
                <PhoneCall size={16} />
                <span>تماس مستقیم:</span>
                <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
