import { lawyer, articles, services, faqs } from '../data/content.js'
import { Link } from '../router.jsx'
import {
  Scale,
  Building2,
  FileSignature,
  Briefcase,
  ShieldCheck,
  Award,
  Calculator,
  ChevronLeft,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  FileCheck2,
  MapPin,
  Sparkles,
} from 'lucide-react'
import './HomePortalSections.css'

export function HomeServicesPreview() {
  const featuredServices = [
    {
      id: 'property-claims',
      title: 'دعاوی ملکی و ثبتی',
      icon: <Building2 size={24} />,
      desc: 'الزام به تنظیم سند رسمی، دعاوی سرقفلی و حق کسب و پیشه، خلع ید، رفع تصرف عدوانی، افراز و دستور فروش ملک مشاع.',
      tag: 'دعاوی ملکی',
    },
    {
      id: 'financial-claims',
      title: 'وصول مطالبات و اسناد تجاری',
      icon: <Briefcase size={24} />,
      desc: 'اجرای مستقیم چک صیادی بدون دادگاه، توقیف فوری حساب‌های بانکی و پلاک‌های ثبتی بدهکار و دفاع در برابر ادعای اعسار.',
      tag: 'اسناد تجاری',
    },
    {
      id: 'contracts-negotiation',
      title: 'تنظیم و داوری قراردادها',
      icon: <FileSignature size={24} />,
      desc: 'نگارش قراردادهای مشارکت در ساخت، پیش‌فروش، بیع، صلح و بازرگانی؛ تعیین شروط وجه التزام روزانه و داوری تخصصی اختلافات.',
      tag: 'قراردادها',
    },
    {
      id: 'court-representation',
      title: 'وکالت در دادگاه‌ها و دیوان عالی',
      icon: <ShieldCheck size={24} />,
      desc: 'حضور مستمر در دادگاه‌های عمومی حقوقی و تجدیدنظر استان تهران، نگارش لوایح دفاعیه تخصصی، اعاده دادرسی و فرجام‌خواهی.',
      tag: 'دفاع قضایی',
    },
  ]

  return (
    <section className="home-section home-services-preview" aria-labelledby="home-services-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <Scale size={14} />
            <span>حوزه‌های تخصصی وکالت در تهران</span>
          </div>
          <h2 id="home-services-heading" className="section-title">
            خدمات تخصصی حقوقی، ملکی و تجاری
          </h2>
          <p className="section-subtitle">
            وکالت تخصصی در محاکم دادگستری تهران، تنظیم قراردادهای پیشرفته و حل‌وفصل دعاوی ملکی و اسناد تجاری
          </p>
        </div>

        <div className="home-services-grid">
          {featuredServices.map((service) => (
            <article className="home-service-card card" key={service.id}>
              <div className="home-service-top">
                <div className="home-service-icon-box">{service.icon}</div>
                <span className="home-service-tag">{service.tag}</span>
              </div>
              <h3 className="home-service-title">{service.title}</h3>
              <p className="home-service-desc">{service.desc}</p>
              <div className="home-service-footer">
                <Link to={`/khadamat/${service.id}`} className="home-service-link">
                  <span>جزئیات و مدارک پرونده</span>
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-services-cta-bar">
          <Link to="/khadamat" className="btn btn-gold home-all-services-btn">
            <span>مشاهده کلیه خدمات تخصصی و مدارک اولیه (۶ حوزه وکالت)</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeAboutSpotlight() {
  return (
    <section className="home-section home-about-spotlight" aria-labelledby="home-about-heading">
      <div className="container">
        <div className="home-about-grid card">
          <div className="home-about-content">
            <div className="eyebrow">
              <Award size={14} />
              <span>صلاحیت و پروانه رسمی وکالت</span>
            </div>
            <h2 id="home-about-heading" className="home-about-title">
              {lawyer.name}؛ {lawyer.title}
            </h2>
            <p className="home-about-subtitle">
              عضو کانون وکلای دادگستری استان البرز • شماره پروانه: {lawyer.licenseNumber}
            </p>

            <p className="home-about-text">{lawyer.bio}</p>

            <div className="home-about-bullets">
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>بررسی موشکافانه اسناد و اعلام درصد شانس واقعی پرونده بدون ادعاهای واهی</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>انعقاد قرارداد الکترونیک شفاف در سامانه خودکاربری ثنا قوه قضاییه</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>گزارش‌دهی مستمر به موکل پس از هر جلسه دادرسی و ابلاغ تصمیمات دادگاه</span>
              </div>
            </div>

            <div className="home-about-actions">
              <Link to="/darbareh" className="btn btn-gold">
                <span>سوابق کامل، پروانه وکالت و منشور اخلاقی</span>
                <ChevronLeft size={16} />
              </Link>
              <Link to="/moshavere" className="btn btn-outline-dark">
                <Calendar size={15} />
                <span>درخواست وقت مشاوره</span>
              </Link>
            </div>
          </div>

          <div className="home-about-sidebar">
            <div className="home-creds-card">
              <div className="creds-header">
                <FileCheck2 size={20} />
                <strong>مشخصات و صلاحیت‌های قانونی</strong>
              </div>
              <ul className="creds-items">
                <li>
                  <span>وکیل:</span>
                  <strong>{lawyer.name}</strong>
                </li>
                <li>
                  <span>مرجع پروانه:</span>
                  <span>{lawyer.barAssociation}</span>
                </li>
                <li>
                  <span>دفتر وکالت:</span>
                  <span>{lawyer.office}</span>
                </li>
                <li>
                  <span>ساعات پذیرش:</span>
                  <span>{lawyer.shortHours}</span>
                </li>
              </ul>
              <div className="creds-quote">
                <blockquote>
                  «وکالت دادگستری برای ما صرفاً دفاع در دادگاه نیست؛ ایجاد امنیت خاطر و شفافیت در مواجهه با قانون است.»
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeCalculatorsBanner() {
  return (
    <section className="home-section home-calc-banner-section" aria-labelledby="home-calc-heading">
      <div className="container">
        <div className="home-calc-card">
          <div className="calc-banner-top">
            <div className="calc-banner-icon">
              <Calculator size={28} />
            </div>
            <div className="calc-banner-header">
              <span className="calc-badge">ابزارهای رایگان و هوشمند آنلاین</span>
              <h2 id="home-calc-heading" className="calc-banner-title">
                محاسبه آنلاین هزینه دادرسی، خسارت تأخیر تأدیه و مهریه
              </h2>
              <p className="calc-banner-desc">
                پیش از هر اقدام قضایی، بر اساس فرمول‌های قانونی و آخرین شاخص‌های بهای کالاها و خدمات مصرفی بانک مرکزی، مبالغ را به صورت دقیق و آنی تخمین بزنید.
              </p>
            </div>
          </div>

          <div className="calc-features-grid">
            <div className="calc-feature-pill">
              <CheckCircle2 size={16} />
              <span>هزینه دادرسی دادگاه (بدوی، تجدیدنظر، فرجام‌خواهی)</span>
            </div>
            <div className="calc-feature-pill">
              <CheckCircle2 size={16} />
              <span>خسارت تأخیر تأدیه چک و مطالبات (ماده ۵۲۲ ق.آ.د.م)</span>
            </div>
            <div className="calc-feature-pill">
              <CheckCircle2 size={16} />
              <span>محاسبه مهریه وجه نقد به نرخ روز (شاخص تورم)</span>
            </div>
            <div className="calc-feature-pill">
              <CheckCircle2 size={16} />
              <span>محاسبه تعرفه قانونی حق‌الوکاله</span>
            </div>
          </div>

          <div className="calc-banner-footer">
            <Link to="/mohasebe" className="btn btn-gold calc-launch-btn">
              <Calculator size={18} />
              <span>ورود به سامانه محاسبه آنلاین حقوقی</span>
              <ChevronLeft size={16} />
            </Link>
            <span className="calc-note">بدون نیاز به ثبت‌نام • کاملاً رایگان و مبتنی بر قوانین روز</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeProcessSummary() {
  const steps = [
    {
      num: '۱',
      title: 'تماس و ثبت درخواست',
      desc: 'ثبت فرم آنلاین، تماس تلفنی یا ارسال پیام در واتساپ جهت بررسی اولیه موضوع.',
    },
    {
      num: '۲',
      title: 'بررسی مدارک و مشاوره',
      desc: 'جلسه حضوری در دفتر سعادت‌آباد یا مشاوره تلفنی و تحلیل شانس برد پرونده.',
    },
    {
      num: '۳',
      title: 'قرارداد الکترونیک ثنا',
      desc: 'تنظیم وکالت‌نامه رسمی در سامانه ثنا با حق‌الوکاله شفاف و پرداخت مرحله‌ای.',
    },
    {
      num: '۴',
      title: 'دفاع در دادگاه تا اجرا',
      desc: 'ثبت دادخواست، حضور در جلسات رسیدگی، تبادل لوایح و پیگیری تا اخذ نتیجه.',
    },
  ]

  return (
    <section className="home-section home-process-section" aria-labelledby="home-process-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <FileCheck2 size={14} />
            <span>شفافیت و امنیت حقوقی</span>
          </div>
          <h2 id="home-process-heading" className="section-title">
            مراحل شفاف پذیرش و پیگیری پرونده
          </h2>
          <p className="section-subtitle">
            فرآیندی قانون‌مدار، مطمئن و گام‌به‌گام از نخستین ارتباط تا اجرای حکم دادگاه با تعهد به گزارش‌دهی مستمر
          </p>
        </div>

        <div className="home-process-grid">
          {steps.map((st) => (
            <div className="home-step-card card" key={st.num}>
              <span className="step-num-badge">{st.num}</span>
              <h3 className="step-title">{st.title}</h3>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="home-process-action">
          <Link to="/marohe" className="btn btn-outline-dark">
            <span>مشاهده جزئیات کامل مراحل و حقوق و تعهدات موکل</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeArticlesPreview() {
  const featuredSlugs = ['what-is-petition', 'gholnameh-vs-mobayenameh', 'cheque-new-law']
  const featuredArticles = articles.filter((a) => featuredSlugs.includes(a.id))

  return (
    <section className="home-section home-articles-section" aria-labelledby="home-articles-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <BookOpen size={14} />
            <span>آموزش و آگاهی‌بخشی حقوقی</span>
          </div>
          <h2 id="home-articles-heading" className="section-title">
            آخرین مقالات و آموزش‌های حقوقی کاربردی
          </h2>
          <p className="section-subtitle">
            تحلیل کاربردی رویه‌های قضایی، نکات حیاتی قراردادها و راهنمای گام‌به‌گام حل اختلافات حقوقی
          </p>
        </div>

        <div className="home-articles-grid">
          {featuredArticles.map((article) => (
            <article className="home-article-card card" key={article.id}>
              <div className="home-article-meta">
                <span className="article-category-badge">{article.category}</span>
                <span className="article-read-time">
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </span>
              </div>
              <h3 className="home-article-title">
                <Link to={`/maghalat/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="home-article-excerpt">{article.excerpt}</p>
              <div className="home-article-bottom">
                <Link to={`/maghalat/${article.id}`} className="home-article-read-btn">
                  <span>مطالعه کامل مقاله</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-articles-cta-bar">
          <Link to="/maghalat" className="btn btn-gold">
            <span>مشاهده کلیه مقالات و آموزش‌های تخصصی (آرشیو کامل)</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeFAQPreview() {
  const previewFaqs = faqs.slice(0, 3)

  return (
    <section className="home-section home-faq-section" aria-labelledby="home-faq-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <HelpCircle size={14} />
            <span>پاسخ به سوالات پرتکرار</span>
          </div>
          <h2 id="home-faq-heading" className="section-title">
            پرسش‌های متداول پیش از آغاز دادرسی
          </h2>
          <p className="section-subtitle">
            پاسخ‌های دقیق و شفاف وکیل پایه یک دادگستری به رایج‌ترین دغدغه‌های مراجعین
          </p>
        </div>

        <div className="home-faq-list">
          {previewFaqs.map((faq, idx) => (
            <div className="home-faq-item card" key={idx}>
              <h3 className="home-faq-q">
                <HelpCircle size={18} className="faq-icon-accent" />
                <span>{faq.q}</span>
              </h3>
              <p className="home-faq-a">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="home-faq-cta-bar">
          <Link to="/faq" className="btn btn-outline-dark">
            <span>مشاهده کلیه پرسش‌ها و پاسخ‌های متداول حقوقی</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomeContactCTA() {
  return (
    <section className="home-section home-contact-cta-section" aria-label="دعوت به مشاوره و ارتباط">
      <div className="container">
        <div className="home-cta-card">
          <div className="home-cta-text">
            <div className="cta-sparkle-row">
              <Sparkles size={16} />
              <span>پاسخگویی مسئولانه و پیگیری تخصصی</span>
            </div>
            <h2 className="cta-headline">نیاز به بررسی مدارک یا مشاوره فوری حقوقی دارید؟</h2>
            <p className="cta-desc">
              پیش از هر اقدام قضایی یا امضای سند، در جلسه مشاوره حضوری در دفتر سعادت‌آباد تهران یا مشاوره تلفنی، از شانس موفقیت، هزینه‌ها و سریع‌ترین مسیر قانونی آگاه شوید.
            </p>
            <div className="cta-address-tag">
              <MapPin size={15} />
              <span>{lawyer.office} ({lawyer.shortHours})</span>
            </div>
          </div>

          <div className="home-cta-buttons">
            <Link to="/moshavere" className="btn btn-gold cta-btn-main">
              <Calendar size={17} />
              <span>رزرو آنلاین نوبت مشاوره</span>
            </Link>
            <a href={lawyer.phoneHref} className="btn btn-outline-light cta-btn-phone">
              <Phone size={16} />
              <span>تماس مستقیم: {lawyer.displayPhone}</span>
            </a>
            <Link to="/tamas" className="btn btn-dark-glass cta-btn-map">
              <MapPin size={15} />
              <span>نشانی، تلفن و مسیرهای دسترسی</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
