import ConsultationForm from '../components/ConsultationForm.jsx'
import { lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  Calendar,
  ChevronLeft,
  FileCheck2,
  Clock,
  MapPin,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react'
import './ArticlePage.css'

export default function ConsultationPage() {
  const canonicalPath = '/moshavere'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}${canonicalPath}#webpage`,
        url: `${SITE_URL}${canonicalPath}`,
        name: `درخواست نوبت مشاوره حقوقی | ${lawyer.name}`,
        description: `رزرو نوبت مشاوره حقوقی حضوری و تلفنی با ${lawyer.name} وکیل پایه یک دادگستری در سعادت‌آباد تهران جهت بررسی اسناد و دعاوی ملکی، مالی و قراردادها.`,
      },
      {
        '@type': 'LegalService',
        name: 'مشاوره حقوقی حضوری و تلفنی',
        provider: {
          '@type': 'Attorney',
          name: lawyer.name,
          telephone: lawyer.phone,
        },
        areaServed: 'تهران',
        url: `${SITE_URL}${canonicalPath}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'رزرو وقت مشاوره', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `مشاوره با پرستو خوئینی | وکیل پایه یک دادگستری تهران - ۰۹۱۲۸۷۵۴۱۷۷`,
    description: `رزرو نوبت مشاوره حضوری و تلفنی با پرستو خوئینی وکیل پایه یک دادگستری در سعادت‌آباد تهران. تلفن مستقیم مشاوره: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177). بررسی اسناد ملکی و قراردادها.`,
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
          <span aria-current="page">رزرو وقت مشاوره حقوقی</span>
        </nav>

        {/* Section Head */}
        <div className="section-head center">
          <div className="eyebrow">
            <Calendar size={14} />
            <span>تعیین وقت قبلی و هماهنگی</span>
          </div>
          <h1 className="section-title">درخواست نوبت مشاوره با وکیل در سعادت‌آباد و تهران</h1>
          <p className="section-subtitle">
            امکان رزرو جلسه مشاوره حضوری در دفتر سعادت‌آباد تهران، مشاوره تلفنی و یا آنلاین برای هموطنان خارج از کشور
          </p>
        </div>

        {/* Three Modes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 1000, margin: '0 auto 40px' }}>
          <div className="card" style={{ background: 'var(--white)', padding: 24, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--gold-subtle)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <MapPin size={22} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark-teal)', marginBottom: 6 }}>مشاوره حضوری</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              جلسات ۳۰ تا ۶۰ دقیقه‌ای در دفتر وکالت سعادت‌آباد تهران با بررسی فیزیکی اصل اسناد، قراردادها و مدارک دعوا.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--white)', padding: 24, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--gold-subtle)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <PhoneCall size={22} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark-teal)', marginBottom: 6 }}>مشاوره تلفنی فوری</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              مناسب برای ارزیابی سریع موضوع، پاسخ به سؤالات فوری دادرسی یا شرایط اضطراری توقیف اموال و جلسات دادگاه.
            </p>
          </div>

          <div className="card" style={{ background: 'var(--white)', padding: 24, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(37, 211, 102, 0.12)', color: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <MessageCircle size={22} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--dark-teal)', marginBottom: 6 }}>مشاوره آنلاین و واتساپ</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              برای موکلین خارج از استان تهران و ایرانیان خارج از کشور همراه با ارسال تصاویر مدارک و ارتباط صوتی/تصویری.
            </p>
          </div>
        </div>

        {/* Embedded Form Component */}
        <ConsultationForm />

        {/* Checklist of what to bring */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--border-subtle)', maxWidth: 860, margin: '50px auto 0', boxShadow: 'var(--shadow-subtle)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 800, color: 'var(--dark-teal)', marginBottom: 14 }}>
            <FileCheck2 size={20} color="var(--gold-dark)" />
            <span>مدارک پیشنهادی برای همراه داشتن در جلسه مشاوره:</span>
          </h2>
          <ul style={{ paddingRight: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li>اصل و کپی کارت ملی و شناسنامه طرفین قرارداد یا خواهان و خوانده.</li>
            <li>کلیه قراردادها، مبایعه‌نامه‌ها، قولنامه‌ها، صورت‌جلسات تحویل یا توافقات کتبی.</li>
            <li>در دعاوی ملکی: تصویر اسناد مالکیت (سند تک‌برگ یا منگوله‌دار) و استعلام‌های شهرداری یا ثبت.</li>
            <li>در دعاوی مالی و چک: اصل لاشه چک یا گواهی عدم پرداخت صادره از بانک با کد رهگیری صیاد.</li>
            <li>شماره پرونده و پرینت ابلاغیه‌های سامانه ثنا (در صورت جریان داشتن پرونده در دادگاه).</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
