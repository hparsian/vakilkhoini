import { useState } from 'react'
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
  ChevronDown,
  ChevronUp,
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
  Shield,
  FileText,
  BadgeCheck,
  Coins,
  Percent,
} from 'lucide-react'
import './HomePortalSections.css'

// 1. SERVICES PREVIEW (6 Specialized Legal Categories)
export function HomeServicesPreview() {
  const featuredServices = [
    {
      id: 'property-claims',
      title: 'دعاوی ملکی و ثبتی',
      icon: <Building2 size={24} />,
      desc: 'الزام به تنظیم سند رسمی، سرقفلی و حق کسب و پیشه، خلع ید، رفع تصرف عدوانی، افراز و فروش املاک مشاع.',
      tag: 'پرتقاضا',
      bullets: ['الزام به تنظیم سند رسمی انتقال ملک', 'دعاوی سرقفلی و تخلیه اماکن تجاری', 'خلع ید، رفع تصرف عدوانی و خلع مشاعی'],
    },
    {
      id: 'financial-claims',
      title: 'وصول مطالبات و چک صیادی',
      icon: <Briefcase size={24} />,
      desc: 'اجرای مستقیم چک صیادی بدون نیاز به دادرسی ماهوی، توقیف فوری اموال بدهکار و دفاع در برابر ادعای اعسار.',
      tag: 'فوری',
      bullets: ['صدور مستقیم اجراییه چک صیادی', 'توقیف حساب‌های بانکی و پلاک ثبتی بدهکار', 'مطالبه سفته، رسیدهای عادی و فاکتور تجاری'],
    },
    {
      id: 'contracts-negotiation',
      title: 'تنظیم و داوری قراردادها',
      icon: <FileSignature size={24} />,
      desc: 'نگارش قراردادهای مشارکت در ساخت، پیش‌فروش، بیع و تجاری با تعیین شروط خسارت روزانه و داوری تخصصی.',
      tag: 'پیشگیرانه',
      bullets: ['قراردادهای مشارکت در ساخت و پیش‌فروش', 'تعیین ضمانت‌های اجرایی و وجه التزام روزانه', 'داوری تخصصی و حل مسالمت‌آمیز اختلاف'],
    },
    {
      id: 'court-representation',
      title: 'وکالت در دادگاه‌ها و دیوان عالی',
      icon: <ShieldCheck size={24} />,
      desc: 'حضور مستمر در محاکم عمومی حقوقی، تجدیدنظر استان تهران و دیوان عالی کشور جهت احقاق تمام حقوق موکل.',
      tag: 'دفاع قضایی',
      bullets: ['دفاع تخصصی در دادگاه‌های بدوی و تجدیدنظر', 'اعاده دادرسی، فرجام‌خواهی و لوایح دیوان', 'پیگیری پرونده در دوایر اجرای احکام مدنی'],
    },
    {
      id: 'petitions-defense',
      title: 'تنظیم تخصصی دادخواست و لوایح',
      icon: <FileText size={24} />,
      desc: 'نگارش علمی و مستدل دادخواست‌های آغاز دادرسی و لوایح دفاعیه جلسات نخست بر مبنای قوانین و آرای وحدت رویه.',
      tag: 'تخصصی',
      bullets: ['تنظیم دادخواست‌های حقوقی و شکواییه مستند', 'لایحه دفاعیه موعد اول دادرسی (تعیین‌کننده)', 'تبادل لوایح در شعب تجدیدنظر و دیوان عالی'],
    },
    {
      id: 'legal-consultation',
      title: 'مشاوره حقوقی تخصصی (حضوری و تلفنی)',
      icon: <Scale size={24} />,
      desc: 'سنجش دقیق شانس پیروزی، ریسک‌های مالی و مدارک لازم پیش از صرف هزینه‌های سنگین دادرسی در تهران.',
      tag: 'راهبردی',
      bullets: ['جلسه حضوری در دفتر سعادت‌آباد تهران', 'مشاوره تلفنی سریع جهت بررسی اولیه موضوع', 'تعیین شفاف هزینه‌ها و استراتژی قانونی'],
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
            خدمات تخصصی وکالت در دادگستری تهران
          </h2>
          <p className="section-subtitle">
            وکالت دعاوی ملکی، ثبتی و اسناد تجاری با بهره‌گیری از مستندترین رویه‌های قضایی و قراردادهای شفاف الکترونیک
          </p>
        </div>

        <div className="home-services-grid">
          {featuredServices.map((service) => (
            <article className="home-service-card card" key={service.id}>
              <div className="home-service-top">
                <div className="home-service-icon-box">{service.icon}</div>
                <span className={`home-service-tag tag-${service.tag}`}>{service.tag}</span>
              </div>
              <h3 className="home-service-title">
                <Link to={`/khadamat/${service.id}`}>{service.title}</Link>
              </h3>
              <p className="home-service-desc">{service.desc}</p>

              <ul className="home-service-bullets" aria-label={`اقدامات کلیدی در ${service.title}`}>
                {service.bullets.map((b, i) => (
                  <li key={i}>
                    <CheckCircle2 size={13} className="svc-check-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="home-service-footer">
                <Link to={`/khadamat/${service.id}`} className="home-service-link">
                  <span>جزئیات پرونده و مدارک لازم</span>
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-services-cta-bar">
          <Link to="/khadamat" className="btn btn-gold home-all-services-btn">
            <span>مشاهده فهرست کامل ۶ حوزه خدمات تخصصی و مدارک اولیه</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// 2. WHY CHOOSE US (E-E-A-T & Trust Building)
export function HomeWhyChooseUs() {
  const reasons = [
    {
      icon: <BadgeCheck size={26} />,
      title: 'سنجش واقعی شانس پرونده',
      desc: 'بررسی موشکافانه اسناد و اعلام درصد موفقیت واقعی بدون ادعاهای واهی، وعده‌های دروغین یا تضمین‌های ناممکن قانونی.',
    },
    {
      icon: <FileSignature size={26} />,
      title: 'قرارداد الکترونیک در سامانه ثنا',
      desc: 'شفافیت کامل در میزان حق‌الوکاله و پرداخت مرحله‌ای متناسب با پیشرفت مراحل دادرسی در سامانه خودکاربری قوه قضاییه.',
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'پیگیری تا آخرین مرحله اجرای حکم',
      desc: 'وکالت صرفاً با اخذ دادنامه پایان نمی‌یابد؛ تا مرحله صدور اجراییه، توقیف اموال و وصول نهایی حق موکل پیگیر هستیم.',
    },
    {
      icon: <Shield size={26} />,
      title: 'حفظ کامل اسرار و محرمانگی',
      desc: 'پایبندی خدشه‌ناپذیر به سوگند وکالت، حفاظت همه‌جانبه از مدارک، اسناد تجاری و اطلاعات خصوصی موکلین.',
    },
  ]

  return (
    <section className="home-section home-why-section" aria-labelledby="home-why-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <Award size={14} />
            <span>تعهدات اخلاقی و استانداردهای حرفه‌ای</span>
          </div>
          <h2 id="home-why-heading" className="section-title">
            چرا دفتر وکالت پرستو خوئینی را انتخاب کنید؟
          </h2>
          <p className="section-subtitle">
            چهار اصل بنیادین در قبول، ارزیابی و دفاع از پرونده‌های حقوقی و ملکی در محاکم دادگستری تهران
          </p>
        </div>

        <div className="home-why-grid">
          {reasons.map((r, idx) => (
            <div className="home-why-card" key={idx}>
              <div className="home-why-icon-box">{r.icon}</div>
              <h3 className="home-why-title">{r.title}</h3>
              <p className="home-why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3. ABOUT SPOTLIGHT (Credentials & Bio)
export function HomeAboutSpotlight() {
  return (
    <section className="home-section home-about-spotlight" aria-labelledby="home-about-heading">
      <div className="container">
        <div className="home-about-grid card">
          <div className="home-about-content">
            <div className="eyebrow">
              <Award size={14} />
              <span>پروانه پایه یک و صلاحیت رسمی وکالت</span>
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
                  <span>شماره پروانه:</span>
                  <strong className="license-badge">{lawyer.licenseNumber}</strong>
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

// 4. INTERACTIVE CALCULATOR PREVIEW (Instant Court Fee Estimation)
export function HomeCalculatorsBanner() {
  const [claimAmount, setClaimAmount] = useState('100000000') // 100M Tomans default
  const [stage, setStage] = useState('badvi')

  // Calculate court fee in Tomans
  const numAmount = Math.max(0, parseFloat(claimAmount) || 0)
  let courtFee = 0
  if (stage === 'badvi') {
    if (numAmount <= 20000000) {
      courtFee = numAmount * 0.025
    } else {
      courtFee = 20000000 * 0.025 + (numAmount - 20000000) * 0.035
    }
  } else {
    courtFee = numAmount * 0.045
  }

  const handlePreset = (val) => {
    setClaimAmount(String(val))
  }

  return (
    <section className="home-section home-calc-banner-section" aria-labelledby="home-calc-heading">
      <div className="container">
        <div className="home-calc-card">
          <div className="calc-banner-layout">
            <div className="calc-banner-info">
              <div className="calc-banner-top">
                <div className="calc-banner-icon">
                  <Calculator size={28} />
                </div>
                <div className="calc-banner-header">
                  <span className="calc-badge">ابزارهای رایگان و هوشمند آنلاین</span>
                  <h2 id="home-calc-heading" className="calc-banner-title">
                    محاسبه آنلاین هزینه دادرسی و خسارت تأخیر
                  </h2>
                  <p className="calc-banner-desc">
                    پیش از طرح هرگونه دعوا در دادگستری، بر اساس آخرین تعرفه‌های قانونی قوه قضاییه هزینه تمبر دادرسی را آنلاین تخمین بزنید.
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
                  <span>خسارت تأخیر تأدیه چک بر اساس تورم بانک مرکزی</span>
                </div>
                <div className="calc-feature-pill">
                  <CheckCircle2 size={16} />
                  <span>محاسبه مهریه وجه نقد به نرخ روز شاخص سالانه</span>
                </div>
                <div className="calc-feature-pill">
                  <CheckCircle2 size={16} />
                  <span>محاسبه تعرفه قانونی حق‌الوکاله و تمبر مالیاتی</span>
                </div>
                <div className="calc-feature-pill">
                  <CheckCircle2 size={16} />
                  <span>چک‌لیست هوشمند ریسک مبایعه‌نامه و ملک (جدید)</span>
                </div>
              </div>

              <div className="calc-banner-footer">
                <Link to="/mohasebe" className="btn btn-gold calc-launch-btn">
                  <Calculator size={18} />
                  <span>ورود به سامانه ابزارهای حقوقی و محاسبات (۵ ابزار تخصصی)</span>
                  <ChevronLeft size={16} />
                </Link>
                <Link to="/checklist-mobayenameh" className="btn btn-outline-dark calc-checklist-link">
                  <CheckCircle2 size={16} />
                  <span>چک‌لیست ریسک خرید ملک</span>
                </Link>
              </div>
            </div>

            {/* Interactive Mini Calculator Teaser */}
            <div className="calc-mini-widget card">
              <div className="mini-widget-head">
                <Percent size={18} className="mini-head-icon" />
                <span>تخمین فوری هزینه دادرسی (پیش‌نمایش تعاملی)</span>
              </div>

              <div className="mini-widget-body">
                <label className="mini-label" htmlFor="home-claim-input">
                  مبلغ خواسته پرونده (تومان):
                </label>
                <div className="mini-input-wrap">
                  <input
                    id="home-claim-input"
                    type="number"
                    min="0"
                    step="5000000"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="mini-input"
                    placeholder="مثال: ۱۰۰۰۰۰۰۰۰"
                  />
                  <span className="mini-currency">تومان</span>
                </div>

                <div className="mini-presets">
                  <button type="button" onClick={() => handlePreset(20000000)} className="preset-btn">۲۰ م</button>
                  <button type="button" onClick={() => handlePreset(50000000)} className="preset-btn">۵۰ م</button>
                  <button type="button" onClick={() => handlePreset(100000000)} className="preset-btn active">۱۰۰ م</button>
                  <button type="button" onClick={() => handlePreset(500000000)} className="preset-btn">۵۰۰ م</button>
                </div>

                <div className="mini-stage-select">
                  <span className="mini-label">مرحله رسیدگی:</span>
                  <div className="stage-radios">
                    <label className={`stage-radio ${stage === 'badvi' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="stage"
                        value="badvi"
                        checked={stage === 'badvi'}
                        onChange={() => setStage('badvi')}
                      />
                      <span>دادگاه بدوی</span>
                    </label>
                    <label className={`stage-radio ${stage === 'tajdid' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="stage"
                        value="tajdid"
                        checked={stage === 'tajdid'}
                        onChange={() => setStage('tajdid')}
                      />
                      <span>تجدیدنظرخواهی</span>
                    </label>
                  </div>
                </div>

                <div className="mini-result-box">
                  <span className="mini-result-label">هزینه تمبر دادرسی تخمینی:</span>
                  <span className="mini-result-val">
                    {Math.round(courtFee).toLocaleString('fa-IR')} <small>تومان</small>
                  </span>
                </div>

                <Link to="/mohasebe" className="mini-full-link">
                  <span>محاسبه پیشرفته خسارت تأخیر، مهریه و تعرفه وکالت</span>
                  <ArrowLeft size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 5. PROCESS SUMMARY (4 Transparent Steps)
export function HomeProcessSummary() {
  const steps = [
    {
      num: '۱',
      title: 'تماس و ثبت درخواست',
      desc: 'ثبت فرم آنلاین، تماس تلفنی یا ارسال پیام در واتساپ جهت بررسی اولیه مدارک و موضوع پرونده.',
    },
    {
      num: '۲',
      title: 'جلسه بررسی و تعیین استراتژی',
      desc: 'حضور در دفتر سعادت‌آباد یا مشاوره تلفنی، ارزیابی مستندات و تخمین درصد واقعی شانس موفقیت.',
    },
    {
      num: '۳',
      title: 'قرارداد الکترونیک در ثنا',
      desc: 'انعقاد قرارداد رسمی وکالت در سامانه قوه قضاییه با حق‌الوکاله معین و شرایط پرداخت مرحله‌ای.',
    },
    {
      num: '۴',
      title: 'دفاع در دادگاه تا اجرای حکم',
      desc: 'ثبت دادخواست، شرکت در جلسات رسیدگی، نگارش لوایح مستند و پیگیری پرونده تا وصول نهایی حق.',
    },
  ]

  return (
    <section className="home-section home-process-section" aria-labelledby="home-process-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <FileCheck2 size={14} />
            <span>فرآیند شفاف و قانون‌مدار</span>
          </div>
          <h2 id="home-process-heading" className="section-title">
            مراحل شفاف پذیرش و پیگیری پرونده
          </h2>
          <p className="section-subtitle">
            مسیر گام‌به‌گام و اطمینان‌بخش از نخستین ارتباط تا اجرای حکم قطعی با تعهد به گزارش‌دهی مستمر به موکل
          </p>
        </div>

        <div className="home-process-grid">
          {steps.map((st) => (
            <div className="home-step-card card" key={st.num}>
              <div className="step-card-top">
                <span className="step-num-badge">{st.num}</span>
                <span className="step-indicator-dot" />
              </div>
              <h3 className="step-title">{st.title}</h3>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="home-process-action">
          <Link to="/marohe" className="btn btn-outline-dark">
            <span>مشاهده جزئیات کامل حقوق موکل و منشور اخلاقی وکالت</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// 6. ARTICLES PREVIEW (Education & Thought Leadership)
export function HomeArticlesPreview() {
  const featuredSlugs = ['what-is-petition', 'daavi-sabti-va-amlak', 'cheque-new-law']
  const featuredArticles = articles.filter((a) => featuredSlugs.includes(a.id))
  // Fallback to first 3 if slugs not all matched
  const displayArticles = featuredArticles.length === 3 ? featuredArticles : articles.slice(0, 3)

  return (
    <section className="home-section home-articles-section" aria-labelledby="home-articles-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <BookOpen size={14} />
            <span>آموزش و آگاهی‌بخشی حقوقی</span>
          </div>
          <h2 id="home-articles-heading" className="section-title">
            جدیدترین مقالات و آموزش‌های تخصصی حقوقی
          </h2>
          <p className="section-subtitle">
            تحلیل کاربردی قوانین روز، رویه‌های قضایی محاکم دادگستری و راهنمای پیشگیری از دعاوی ملکی و مالی
          </p>
        </div>

        <div className="home-articles-grid">
          {displayArticles.map((article) => (
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
                  <span>مطالعه کامل مقاله و نکات کلیدی</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-articles-cta-bar">
          <Link to="/maghalat" className="btn btn-gold">
            <span>مشاهده کلیه مقالات و آموزش‌های تخصصی (آرشیو کامل وبلاگ)</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// 7. FAQ ACCORDION (Interactive Q&A for Rich Snippets)
export function HomeFAQPreview() {
  const [openIdx, setOpenIdx] = useState(0) // First open by default

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx)
  }

  const previewFaqs = faqs.slice(0, 5)

  return (
    <section className="home-section home-faq-section" aria-labelledby="home-faq-heading">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">
            <HelpCircle size={14} />
            <span>پاسخ شفاف به دغدغه‌های مراجعین</span>
          </div>
          <h2 id="home-faq-heading" className="section-title">
            پرسش‌های متداول پیش از آغاز دادرسی
          </h2>
          <p className="section-subtitle">
            پاسخ‌های دقیق و مستند وکیل پایه یک دادگستری به پرتکرارترین ابهامات موکلین
          </p>
        </div>

        <div className="home-faq-accordion">
          {previewFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div className={`faq-accordion-item ${isOpen ? 'open' : ''}`} key={idx}>
                <button
                  type="button"
                  className="faq-accordion-trigger"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq-question-text">
                    <HelpCircle size={18} className="faq-icon-accent" />
                    <span>{faq.q}</span>
                  </span>
                  <span className="faq-chevron-box">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-answer-${idx}`} className="faq-accordion-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="home-faq-cta-bar">
          <Link to="/faq" className="btn btn-outline-dark">
            <span>مشاهده همه سوالات و پاسخ‌های تکمیلی حقوقی</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// 8. CONTACT & APPOINTMENT CTA BANNER
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
            <h2 className="cta-headline">نیاز به بررسی اسناد یا مشاوره فوری حقوقی دارید؟</h2>
            <p className="cta-desc">
              پیش از هر اقدام قضایی یا امضای هر سندی، در جلسه مشاوره حضوری در سعادت‌آباد تهران یا مشاوره تلفنی، از شانس واقعی پیروزی، هزینه‌های دادرسی و مطمئن‌ترین مسیر قانونی آگاه شوید.
            </p>
            <div className="cta-meta-badges">
              <div className="cta-address-tag">
                <MapPin size={15} />
                <span>{lawyer.office}</span>
              </div>
              <div className="cta-time-tag">
                <Clock size={14} />
                <span>{lawyer.shortHours}</span>
              </div>
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
              <span>نشانی دقیق دفتر و مسیرهای دسترسی</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
