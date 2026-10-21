import { process, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  FileText,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  FileCheck,
  Shield,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react'
import '../components/Process.css'
import './ArticlePage.css'

export default function ProcessPage() {
  const canonicalPath = '/marohe'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}${canonicalPath}#howto`,
        name: 'مراحل پذیرش و پیگیری پرونده حقوقی در دفتر وکالت',
        description: 'راهنمای گام‌به‌گام مراحل پذیرش، عقد قرارداد الکترونیک ثنا و پیگیری پرونده حقوقی تا صدور رأی و اجرای احکام مدنی.',
        step: process.map((p, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: p.title,
          text: p.desc,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'مراحل پذیرش پرونده', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `مراحل پذیرش پرونده حقوقی | پرستو خوئینی وکیل پایه یک دادگستری - ۰۹۱۲۸۷۵۴۱۷۷`,
    description: `روند پذیرش پرونده و انعقاد قرارداد وکالت ثنا نزد پرستو خوئینی وکیل پایه یک دادگستری در تهران و سعادت‌آباد. شماره تماس: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).`,
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
          <span aria-current="page">مراحل پذیرش پرونده</span>
        </nav>

        {/* Section Head */}
        <div className="section-head center">
          <div className="eyebrow">
            <FileText size={14} />
            <span>شفافیت و امنیت حقوقی</span>
          </div>
          <h1 className="section-title">مراحل پذیرش و پیگیری پرونده با وکیل در تهران</h1>
          <p className="section-subtitle">
            فرآیندی شفاف، قانون‌مدار و گام‌به‌گام از نخستین تماس تا اجرای حکم دادگاه، با تعهد به گزارش‌دهی مستمر
          </p>
        </div>

        {/* Process Steps List */}
        <div className="process-timeline" style={{ maxWidth: 860, margin: '0 auto 60px' }}>
          {process.map((item, idx) => (
            <div className="process-card card" key={idx} style={{ marginBottom: 24, padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
                <span className="process-step-badge" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--dark-teal)', color: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, flexShrink: 0 }}>
                  {item.step}
                </span>
                <div>
                  <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--dark-teal)' }}>{item.title}</h2>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--gold-dark)', background: 'var(--gold-subtle)', padding: '2px 10px', borderRadius: 20 }}>
                    {item.action}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, paddingRight: 62 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Client Guarantees Box */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '36px', border: '1px solid var(--border-subtle)', maxWidth: 860, margin: '0 auto 50px', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 800, color: 'var(--dark-teal)', marginBottom: 18 }}>
            <Shield size={22} color="var(--gold-dark)" />
            <span>حقوق و آرامش‌خاطر موکل در طول مراحل دادرسی:</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>ثبت الکترونیک وکالت‌نامه رسمی در سامانه ثنا قوه قضاییه با امکان رویت مستقیم موکل</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>درج دقیق میزان و مواعد پرداخت حق‌الوکاله مرحله‌ای در قرارداد بدون هزینه‌های پنهان</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>ارسال نسخه لوایح تقدیمی، صورت‌جلسات دادگاه و آرای صادره از طریق پیام‌رسان به موکل</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>پاسخگویی تلفنی در ساعات اداری جهت رفع ابهامات و تشریح تصمیمات قضایی شعبه</span>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="about-cta-card">
          <div className="cta-icon">
            <Calendar size={28} />
          </div>
          <div className="cta-content">
            <h2>برای شروع، گام اول را بردارید</h2>
            <p>
              با رزرو یک جلسه مشاوره حضوری یا تلفنی، اسناد و مدارک خود را با وکیل پرستو خوئینی بررسی فرمایید.
            </p>
          </div>
          <div className="cta-btns">
            <Link to="/moshavere" className="btn btn-gold">
              <Calendar size={16} />
              <span>شروع فرایند و تعیین وقت</span>
            </Link>
            <a href={lawyer.phoneHref} className="btn btn-outline-light">
              <PhoneCall size={16} />
              <span>تماس مستقیم با دفتر</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
