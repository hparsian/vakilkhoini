import { useState } from 'react'
import { lawyer } from '../data/content.js'
import heroPortrait from '../assets/hero-portrait.jpg'
import { Phone, MessageCircle, Calendar, ShieldCheck, Award, CheckCircle2, Copy, Check, Scale } from 'lucide-react'
import { Link } from '../router.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './Hero.css'

export default function Hero() {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyPhone = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(lawyer.phone)
    setCopied(true)
    showToast(`شماره تماس وکیل با موفقیت کپی شد (${lawyer.phone})`, 'success')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section id="home" className="hero" aria-label="بخش معرفی اصلی">
      {/* Background ambient lighting */}
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="hero-pattern" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            <span>{lawyer.city}، {lawyer.region} • {lawyer.barAssociation}</span>
          </div>

          <h1 className="hero-headline">
            <span className="hero-badge-eyebrow">وکیل پایه یک دادگستری در تهران و سعادت‌آباد</span>
            <span className="hero-name-highlight">{lawyer.name}</span>
            <span className="hero-title-sub">متخصص دعاوی ملکی، اسناد تجاری، داوری و تنظیم قراردادها</span>
          </h1>

          <p className="hero-slogan">
            دفاع مستند، پیگیری مسئولانه و مشاوره تخصصی در محاکم دادگستری تهران
          </p>

          <p className="hero-text">
            رویکرد ما در دفتر وکالت سعادت‌آباد، پرهیز از وعده‌های واهی و اتکا به دانش به‌روز حقوقی، بررسی موشکافانه اسناد و حفظ صددرصدی محرمانگی پرونده موکلین است.
          </p>

          <div className="hero-actions">
            <Link to="/moshavere" className="btn btn-gold hero-btn-primary">
              <Calendar size={18} />
              <span>درخواست مشاوره حقوقی</span>
            </Link>

            <Link to="/khadamat" className="btn btn-outline-light hero-btn-services">
              <Scale size={17} />
              <span>خدمات تخصصی</span>
            </Link>

            <a href={lawyer.phoneHref} className="btn btn-outline-light hero-btn-phone" aria-label={`تماس مستقیم با شماره ${lawyer.phone}`}>
              <Phone size={17} />
              <span>تماس مستقیم:</span>
              <span dir="ltr" className="phone-num phone-number">{lawyer.displayPhone}</span>
            </a>

            <button
              onClick={handleCopyPhone}
              className="hero-copy-btn"
              title="کپی شماره تلفن"
              aria-label="کپی شماره تلفن وکیل"
            >
              {copied ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
            </button>

            <a
              href={lawyer.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp hero-btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>مشاوره در واتساپ</span>
            </a>
          </div>

          {/* Quick trust metrics */}
          <div className="hero-highlights">
            <div className="hero-highlight-item">
              <CheckCircle2 size={16} className="highlight-icon" />
              <span>پروانه رسمی دادگستری ۳۴۸۹۲</span>
            </div>
            <div className="hero-highlight-item">
              <CheckCircle2 size={16} className="highlight-icon" />
              <span>پیگیری مستمر تا اجرای حکم</span>
            </div>
            <div className="hero-highlight-item">
              <CheckCircle2 size={16} className="highlight-icon" />
              <span>مشاوره حضوری و آنلاین</span>
            </div>
          </div>

          {/* Quick Access Legal Topics (SEO & UX Internal Links) */}
          <div className="hero-quick-topics" aria-label="دسترسی سریع به موضوعات حقوقی">
            <span className="quick-topics-label">موضوعات پرجستجو:</span>
            <div className="quick-topics-tags">
              <Link to="/khadamat/property-claims" className="quick-topic-tag">الزام به تنظیم سند</Link>
              <Link to="/khadamat/financial-claims" className="quick-topic-tag">وصول چک صیادی</Link>
              <Link to="/khadamat/contracts-negotiation" className="quick-topic-tag">قرارداد مشارکت در ساخت</Link>
              <Link to="/mohasebe" className="quick-topic-tag gold">محاسبه آنلاین هزینه دادرسی</Link>
              <Link to="/maghalat/what-is-petition" className="quick-topic-tag">دادخواست حقوقی چیست؟</Link>
            </div>
          </div>
        </div>

        {/* Hero Portrait with luxury gold frame without altering face */}
        <div className="hero-media">
          <div className="hero-portrait-wrapper">
            <div className="portrait-glow-ring" aria-hidden="true" />
            <div className="portrait-dashed-ring" aria-hidden="true" />
            <div className="portrait-gold-bezel">
              <div className="portrait-image-container">
                <img
                  src={heroPortrait}
                  alt={`${lawyer.name}، ${lawyer.title} در تهران`}
                  width="500"
                  height="500"
                  className="hero-portrait-img"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
                <div className="portrait-inner-shadow" aria-hidden="true" />
              </div>
            </div>

            {/* Floating Credential Badges */}
            <div className="floating-badge badge-top">
              <div className="badge-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">وکیل پایه یک دادگستری</span>
                <span className="badge-subtitle">عضو کانون وکلای مرکز</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom">
              <div className="badge-icon-box gold">
                <Award size={20} />
              </div>
              <div className="badge-text-box">
                <span className="badge-title">دعاوی ملکی، تجاری و قراردادها</span>
                <span className="badge-subtitle">مشاوره دقیق و اخلاق‌مدار</span>
              </div>
            </div>

            <div className="floating-status-pill">
              <span className="status-dot" />
              <span>آماده پذیرش پرونده و مشاوره</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

