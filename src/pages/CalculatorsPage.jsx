import { useState, useEffect, useId } from 'react'
import { lawyer } from '../data/content.js'
import { articlesForTopic, servicesForTopic } from '../data/related.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { useToast } from '../context/ToastContext.jsx'
import {
  cpiAnnualIndexes,
  formatPersianNumber,
  parseNumberInput,
} from '../data/cpiIndexes.js'
import {
  Calculator,
  Scale,
  TrendingUp,
  HeartHandshake,
  Briefcase,
  Copy,
  Share2,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  ChevronLeft,
  Calendar,
  AlertCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react'
import RealEstateRiskChecklist from '../components/RealEstateRiskChecklist.jsx'
import './CalculatorsPage.css'
import './ArticlePage.css'

export default function CalculatorsPage({ defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'courtFee')
  const { showToast } = useToast()

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab)
    }
  }, [defaultTab])

  // 1. Court Fee State
  const [claimType, setClaimType] = useState('financial-first') // 'financial-first', 'financial-appeal', 'financial-supreme', 'non-financial', 'dispute-council'
  const [claimAmountStr, setClaimAmountStr] = useState('100000000') // 100 million Tomans
  const claimAmount = parseNumberInput(claimAmountStr)

  // 2. Delay Damage State (ماده 522 ق.آ.د.م)
  const [delayPrincipalStr, setDelayPrincipalStr] = useState('50000000')
  const [dueYear, setDueYear] = useState('1399')
  const [payYear, setPayYear] = useState('1403')
  const delayPrincipal = parseNumberInput(delayPrincipalStr)

  // 3. Mahr State (مهریه به نرخ روز)
  const [mahrAmountStr, setMahrAmountStr] = useState('10000000') // 10 million Tomans or Rials
  const [marriageYear, setMarriageYear] = useState('1380')
  const [settleYear, setSettleYear] = useState('1403')
  const mahrAmount = parseNumberInput(mahrAmountStr)

  // 4. Attorney Fee State (حق‌الوکاله طبق تعرفه)
  const [feeClaimStr, setFeeClaimStr] = useState('300000000')
  const [feeStage, setFeeStage] = useState('both') // 'first', 'appeal', 'both'
  const feeClaim = parseNumberInput(feeClaimStr)

  // Unique accessible IDs for inputs
  const courtClaimInputId = useId()
  const delayPrincipalInputId = useId()
  const delayDueYearSelectId = useId()
  const delayPayYearSelectId = useId()
  const mahrInputId = useId()
  const mahrMarriageYearSelectId = useId()
  const mahrSettleYearSelectId = useId()
  const feeClaimInputId = useId()

  // Calculation logic
  // 1. Court Fees
  let courtFee = 0
  let courtFeeFormula = ''
  if (claimType === 'financial-first') {
    // 2.5% up to 20m Tomans, 3.5% above 20m
    const limit = 20000000
    if (claimAmount <= limit) {
      courtFee = claimAmount * 0.025
      courtFeeFormula = '۲.۵ درصد از کل بهای خواسته (تا ۲۰ میلیون تومان)'
    } else {
      courtFee = limit * 0.025 + (claimAmount - limit) * 0.035
      courtFeeFormula = '۲.۵ درصد تا سقف ۲۰ میلیون تومان + ۳.۵ درصد نسبت به مازاد آن'
    }
  } else if (claimType === 'financial-appeal') {
    courtFee = claimAmount * 0.045
    courtFeeFormula = '۴.۵ درصد از کل ارزش بهای خواسته محکوم‌به'
  } else if (claimType === 'financial-supreme') {
    courtFee = claimAmount * 0.055
    courtFeeFormula = '۵.۵ درصد از کل ارزش بهای خواسته محکوم‌به'
  } else if (claimType === 'dispute-council') {
    // 50% of financial-first up to council threshold
    const limit = 20000000
    const full = claimAmount <= limit ? claimAmount * 0.025 : limit * 0.025 + (claimAmount - limit) * 0.035
    courtFee = full * 0.5
    courtFeeFormula = '۵۰ درصد هزینه دادرسی دادگاه‌های عمومی حقوقی'
  } else if (claimType === 'non-financial') {
    courtFee = 200000 // Average standard tariff in Tomans
    courtFeeFormula = 'مبلغ ثابت تعرفه‌ای دعاوی غیرمالی بر اساس نوع خواسته (حدود ۱۰۰ الی ۳۰۰ هزار تومان)'
  }

  // 2. Delay Damages Calculation
  const dueIndex = cpiAnnualIndexes[dueYear] || 1
  const payIndex = cpiAnnualIndexes[payYear] || 1
  const updatedValue = (payIndex / dueIndex) * delayPrincipal
  const delayInterest = Math.max(0, updatedValue - delayPrincipal)

  // 3. Mahr Calculation
  const mahrMarriageIndex = cpiAnnualIndexes[marriageYear] || 1
  const mahrSettleIndex = cpiAnnualIndexes[settleYear] || 1
  const mahrUpdatedValue = (mahrSettleIndex / mahrMarriageIndex) * mahrAmount

  // 4. Attorney Fee Calculation — ماده ۹ آیین‌نامه تعرفه حق‌الوکاله مصوب ۱۳۹۸ (مبالغ به تومان)
  // آستانه‌های ریالی ماده ۹ به تومان: تا ۵۰ میلیون ۸٪، تا ۲۰۰ میلیون ۷٪، تا ۱ میلیارد ۵٪، تا ۳ میلیارد ۴٪، مازاد بر ۳ میلیارد ۳٪ (پلکانی روی مازاد هر پله)
  let baseTariff = 0
  if (feeClaim <= 50000000) {
    baseTariff = feeClaim * 0.08
  } else if (feeClaim <= 200000000) {
    baseTariff = 50000000 * 0.08 + (feeClaim - 50000000) * 0.07
  } else if (feeClaim <= 1000000000) {
    baseTariff = 50000000 * 0.08 + 150000000 * 0.07 + (feeClaim - 200000000) * 0.05
  } else if (feeClaim <= 3000000000) {
    baseTariff = 50000000 * 0.08 + 150000000 * 0.07 + 800000000 * 0.05 + (feeClaim - 1000000000) * 0.04
  } else {
    baseTariff = 50000000 * 0.08 + 150000000 * 0.07 + 800000000 * 0.05 + 2000000000 * 0.04 + (feeClaim - 3000000000) * 0.03
  }
  let calculatedLawyerFee = baseTariff
  let feeStageDesc = 'مرحله بدوی و تجدیدنظر (مجموعاً ۱۰۰٪ تعرفه قانونی)'
  if (feeStage === 'first') {
    calculatedLawyerFee = baseTariff * 0.6
    feeStageDesc = 'صرفاً مرحله بدوی (۶۰ درصد از کل تعرفه)'
  } else if (feeStage === 'appeal') {
    calculatedLawyerFee = baseTariff * 0.4
    feeStageDesc = 'صرفاً مرحله تجدیدنظر (۴۰ درصد از کل تعرفه)'
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'ابزارهای آنلاین محاسبه حقوقی - دفتر وکالت پرستو خوئینی',
        description:
          'سامانه رایگان محاسبه آنلاین هزینه دادرسی دادگاه، خسارت تأخیر تأدیه چک و مطالبات، محاسبه مهریه به نرخ روز و تعرفه حق‌الوکاله بر اساس قوانین و شاخص‌های بانک مرکزی.',
        url: `${SITE_URL}/mohasebe`,
        applicationCategory: 'LegalService',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IRR',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'ابزارهای محاسبه حقوقی', item: `${SITE_URL}/mohasebe` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'هزینه دادرسی در مرحله بدوی چگونه محاسبه می‌شود؟',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'در دعاوی مالی تا ۲۰ میلیون تومان، ۲.۵ درصد و برای مبالغ مازاد بر ۲۰ میلیون تومان، ۳.۵ درصد از ارزش خواسته به عنوان هزینه دادرسی به صندوق دادگستری پرداخت می‌شود.',
            },
          },
          {
            '@type': 'Question',
            name: 'مبنای قانونی محاسبه خسارت تأخیر تأدیه چیست؟',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'ماده ۵۲۲ قانون آیین دادرسی مدنی مبنای محاسبه خسارت تأخیر تأدیه بر اساس شاخص تورم اعلامی بانک مرکزی جمهوری اسلامی ایران از تاریخ سررسید تا روز پرداخت است.',
            },
          },
          {
            '@type': 'Question',
            name: 'آیا مهریه وجه نقد به نرخ روز محاسبه می‌شود؟',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'بله، بر اساس تبصره الحاقی به ماده ۱۰۸۲ قانون مدنی، مهریه ریالی متناسب با تغییر شاخص بهای کالاها و خدمات مصرفی بانک مرکزی در زمان مطالبه تعدیل و پرداخت می‌شود.',
            },
          },
        ],
      },
    ],
  }

  const isChecklistTab = activeTab === 'realEstateChecklist'

  const summaryLinks = {
    articles: articlesForTopic(
      'هزینه دادرسی خسارت تأخیر تأدیه مهریه نرخ روز چک صیادی اعسار تعرفه حق الوکاله مبایعه‌نامه',
      4,
    ),
    services: servicesForTopic('محاسبه هزینه دادرسی وصول چک مطالبات مالی تنظیم قرارداد', 2),
  }

  useSEO({
    title: isChecklistTab
      ? 'چک‌لیست ریسک مبایعه‌نامه ملک | پرستو خوئینی وکیل تهران - ۰۹۱۲۸۷۵۴۱۷۷'
      : 'محاسبه آنلاین هزینه دادرسی و مهریه | پرستو خوئینی - ۰۹۱۲۸۷۵۴۱۷۷',
    description: isChecklistTab
      ? 'چک‌لیست تخصصی ارزیابی ریسک خرید ملک و مبایعه‌نامه توسط پرستو خوئینی وکیل پایه یک دادگستری تهران (سعادت‌آباد). شماره تماس: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).'
      : 'محاسبه آنلاین هزینه دادرسی، تاخیر تادیه، مهریه و تعرفه حق‌الوکاله توسط پرستو خوئینی وکیل پایه یک دادگستری تهران. شماره تماس: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).',
    path: isChecklistTab ? '/checklist-mobayenameh' : '/mohasebe',
    jsonLd,
  })

  const copyResultText = (text) => {
    navigator.clipboard.writeText(text)
    showToast('نتیجه محاسبه با موفقیت کپی شد', 'success')
  }

  const shareToSocial = (type, title, text) => {
    const url = `${SITE_URL}/mohasebe`
    const shareMessage = `${title}\n${text}\nمنبع و مشاوره با وکیل پرستو خوئینی:\n${url}`
    if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank', 'noopener,noreferrer')
    } else if (type === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + '\n' + text)}`, '_blank', 'noopener,noreferrer')
    } else if (type === 'eitaa') {
      window.open(`https://eitaa.com/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + '\n' + text)}`, '_blank', 'noopener,noreferrer')
    }
  }

  const yearsList = Object.keys(cpiAnnualIndexes)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main id="main" className="calc-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">ابزارهای آنلاین محاسبه حقوقی</span>
        </nav>

        {/* Section Header */}
        <div className="section-head center">
          <div className="eyebrow">
            <Calculator size={14} />
            <span>ابزارهای رایگان و کاربردی حقوقی</span>
          </div>
          <h1 className="section-title">
            {isChecklistTab
              ? 'چک‌لیست ریسک خرید ملک و مبایعه‌نامه با وکیل حقوقی تهران'
              : 'ابزارهای آنلاین وکیل در تهران برای محاسبه هزینه دادرسی و مهریه'}
          </h1>
          <p className="section-subtitle">
            محاسبه دقیق و مستند بر اساس آخرین قوانین مدنی، آیین دادرسی، تعرفه‌های قضایی و شاخص‌های رسمی بانک مرکزی
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="calc-tabs-bar" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'courtFee'}
            className={`calc-tab-btn ${activeTab === 'courtFee' ? 'active' : ''}`}
            onClick={() => setActiveTab('courtFee')}
          >
            <Scale size={18} />
            <span>هزینه دادرسی دادگاه</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'delay'}
            className={`calc-tab-btn ${activeTab === 'delay' ? 'active' : ''}`}
            onClick={() => setActiveTab('delay')}
          >
            <TrendingUp size={18} />
            <span>خسارت تأخیر تأدیه (ماده ۵۲۲)</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'mahr'}
            className={`calc-tab-btn ${activeTab === 'mahr' ? 'active' : ''}`}
            onClick={() => setActiveTab('mahr')}
          >
            <HeartHandshake size={18} />
            <span>مهریه به نرخ روز</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'attorneyFee'}
            className={`calc-tab-btn ${activeTab === 'attorneyFee' ? 'active' : ''}`}
            onClick={() => setActiveTab('attorneyFee')}
          >
            <Briefcase size={18} />
            <span>تعرفه قانونی حق‌الوکاله</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'realEstateChecklist'}
            className={`calc-tab-btn ${activeTab === 'realEstateChecklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('realEstateChecklist')}
          >
            <ShieldCheck size={18} />
            <span>چک‌لیست ریسک مبایعه‌نامه</span>
          </button>
        </div>

        {/* Tab 1: Court Fee Calculator */}
        {activeTab === 'courtFee' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <Scale size={24} />
              </div>
              <div>
                <h2>محاسبه آنلاین هزینه دادرسی دادگستری</h2>
                <p>تعیین مبلغ دقیق تمبر دادرسی جهت ثبت دادخواست در مراجع قضایی و شورای حل اختلاف</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label>مرحله و مرجع رسیدگی قضایی</label>
                  <div className="calc-options-grid">
                    <button
                      type="button"
                      className={`calc-opt-btn ${claimType === 'financial-first' ? 'selected' : ''}`}
                      onClick={() => setClaimType('financial-first')}
                    >
                      <strong>دعاوی مالی - مرحله بدوی</strong>
                      <small>دادگاه‌های عمومی حقوقی</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${claimType === 'financial-appeal' ? 'selected' : ''}`}
                      onClick={() => setClaimType('financial-appeal')}
                    >
                      <strong>دعاوی مالی - تجدیدنظر</strong>
                      <small>دادگاه تجدیدنظر استان</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${claimType === 'financial-supreme' ? 'selected' : ''}`}
                      onClick={() => setClaimType('financial-supreme')}
                    >
                      <strong>فرجام‌خواهی و اعاده دادرسی</strong>
                      <small>دیوان عالی کشور</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${claimType === 'dispute-council' ? 'selected' : ''}`}
                      onClick={() => setClaimType('dispute-council')}
                    >
                      <strong>شورای حل اختلاف</strong>
                      <small>نصف هزینه دادگاه عمومی</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${claimType === 'non-financial' ? 'selected' : ''}`}
                      onClick={() => setClaimType('non-financial')}
                    >
                      <strong>دعاوی غیرمالی</strong>
                      <small>تخلیه، الزام به سند، تمکین و...</small>
                    </button>
                  </div>
                </div>

                {claimType !== 'non-financial' && (
                  <div className="form-group">
                    <label htmlFor={courtClaimInputId}>مبلغ یا بهای خواسته (تومان)</label>
                    <div className="input-with-badge">
                      <input
                        id={courtClaimInputId}
                        type="text"
                        className="calc-input"
                        value={formatPersianNumber(claimAmount)}
                        onChange={(e) => setClaimAmountStr(e.target.value)}
                        placeholder="مثال: ۱۰۰،۰۰۰،۰۰۰"
                      />
                      <span className="input-unit">تومان</span>
                    </div>
                    <span className="input-hint">
                      معادل ریالی: {formatPersianNumber(claimAmount * 10)} ریال
                    </span>
                  </div>
                )}
              </div>

              <div className="calc-result-pane">
                <div className="result-box">
                  <span className="result-label">مبلغ هزینه دادرسی قابل پرداخت:</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(courtFee)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-sub-detail">
                    <FileText size={14} />
                    <span>مبنای محاسبه: {courtFeeFormula}</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `هزینه دادرسی بهای خواسته ${formatPersianNumber(claimAmount)} تومان: ${formatPersianNumber(courtFee)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی نتیجه</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه هزینه دادرسی دادگستری',
                        `بهای خواسته: ${formatPersianNumber(claimAmount)} تومان\nهزینه دادرسی: ${formatPersianNumber(courtFee)} تومان`
                      )
                    }
                  >
                    <Share2 size={16} />
                    <span>ارسال در واتساپ</span>
                  </button>
                </div>

                <div className="lawyer-cta-box">
                  <div className="cta-avatar">
                    <Scale size={20} />
                  </div>
                  <div className="cta-text">
                    <strong>آیا قصد طرح دعوا یا ثبت دادخواست دارید؟</strong>
                    <p>بررسی اسناد و نگارش تخصصی دادخواست مانع از رد دعوا و هدررفت هزینه دادرسی می‌شود.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>مشاوره با وکیل</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Footnote */}
            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>نکات حقوقی مهم در پرداخت هزینه دادرسی:</span>
              </h3>
              <ul>
                <li>علاوه بر هزینه دادرسی فوق، مبالغ ناچیزی بابت تطبیق اوراق، ثبت الکترونیک قضایی و برگ‌های دادخواست در دفاتر خدمات قضایی اخذ می‌شود.</li>
                <li>در صورت اثبات اعسار از پرداخت هزینه دادرسی، امکان معافیت موقت تا زمان صدور حکم و وصول طلب وجود دارد.</li>
                <li>در صورت پیروزی در پرونده، کلیه هزینه‌های دادرسی پرداختی از خوانده دعوا قابل مطالبه و وصول خواهد بود.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Delay Damage Calculator (ماده 522 ق.آ.د.م) */}
        {activeTab === 'delay' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <TrendingUp size={24} />
              </div>
              <div>
                <h2>محاسبه آنلاین خسارت تأخیر تأدیه چک و مطالبات مالی</h2>
                <p>محاسبه قانونی کاهش ارزش پول بر اساس ماده ۵۲۲ قانون آیین دادرسی مدنی و شاخص‌های سالانه بانک مرکزی</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label htmlFor={delayPrincipalInputId}>مبلغ اصل طلب یا بدهی (تومان)</label>
                  <div className="input-with-badge">
                    <input
                      id={delayPrincipalInputId}
                      type="text"
                      className="calc-input"
                      value={formatPersianNumber(delayPrincipal)}
                      onChange={(e) => setDelayPrincipalStr(e.target.value)}
                      placeholder="مثال: ۵۰،۰۰۰،۰۰۰"
                    />
                    <span className="input-unit">تومان</span>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor={delayDueYearSelectId}>سال سررسید یا مطالبه دین</label>
                    <select
                      id={delayDueYearSelectId}
                      className="calc-select"
                      value={dueYear}
                      onChange={(e) => setDueYear(e.target.value)}
                    >
                      {yearsList.map((y) => (
                        <option key={y} value={y}>
                          سال {formatPersianNumber(y)}
                        </option>
                      ))}
                    </select>
                    <small className="field-hint">شاخص تورم: {cpiAnnualIndexes[dueYear]}</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor={delayPayYearSelectId}>سال تسویه یا پرداخت</label>
                    <select
                      id={delayPayYearSelectId}
                      className="calc-select"
                      value={payYear}
                      onChange={(e) => setPayYear(e.target.value)}
                    >
                      {yearsList.map((y) => (
                        <option key={y} value={y}>
                          سال {formatPersianNumber(y)}
                        </option>
                      ))}
                    </select>
                    <small className="field-hint">شاخص تورم: {cpiAnnualIndexes[payYear]}</small>
                  </div>
                </div>
              </div>

              <div className="calc-result-pane">
                <div className="result-box highlight">
                  <span className="result-label">خسارت تأخیر تأدیه متعلقه:</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(delayInterest)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-breakdown">
                    <div className="breakdown-row">
                      <span>اصل مبلغ طلب:</span>
                      <strong>{formatPersianNumber(delayPrincipal)} تومان</strong>
                    </div>
                    <div className="breakdown-row total">
                      <span>مجموع طلب با احتساب خسارت تأخیر:</span>
                      <strong>{formatPersianNumber(updatedValue)} تومان</strong>
                    </div>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `اصل طلب: ${formatPersianNumber(delayPrincipal)} تومان\nخسارت تاخیر تادیه (${dueYear} تا ${payYear}): ${formatPersianNumber(delayInterest)} تومان\nکل بدهی: ${formatPersianNumber(updatedValue)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی نتیجه</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه خسارت تأخیر تأدیه ماده ۵۲۲',
                        `اصل طلب: ${formatPersianNumber(delayPrincipal)} تومان\nخسارت تاخیر: ${formatPersianNumber(delayInterest)} تومان\nمجموع: ${formatPersianNumber(updatedValue)} تومان`
                      )
                    }
                  >
                    <Share2 size={16} />
                    <span>ارسال در واتساپ</span>
                  </button>
                </div>

                <div className="lawyer-cta-box">
                  <div className="cta-avatar">
                    <Scale size={20} />
                  </div>
                  <div className="cta-text">
                    <strong>مطالبه چک صیادی یا اسناد مالی دارید؟</strong>
                    <p>وکیل پایه یک با توقیف فوری اموال مدیون و حساب‌های بانکی، خسارت تأخیر تأدیه را به روز وصول می‌نماید.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>مشاوره و وصول طلب</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>شروط سه گانه ماده ۵۲۲ قانون آیین دادرسی مدنی:</span>
              </h3>
              <ul>
                <li>موضوع دین باید وجه رایج (ریال یا تومان) باشد.</li>
                <li>طلبکار باید دین را به طور رسمی (با اظهارنامه، واخواست چک یا دادخواست) مطالبه کرده باشد.</li>
                <li>مدیون با وجود تمکن مالی از پرداخت بدهی استنکاف کرده و نرخ تورم تغییر فاحش داشته باشد.</li>
              </ul>
              <p>
                مبنای محاسبه: میانگین شاخص سالانه بانک مرکزی (پایه ۱۳۹۵=۱۰۰). برای تاریخ‌های دقیق درون‌سالی، شاخص ماهانه همان تاریخ ملاک است؛ نتیجه «برآورد» محسوب می‌شود.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Mahr Calculator (مهریه به نرخ روز) */}
        {activeTab === 'mahr' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h2>محاسبه آنلاین مهریه وجه نقد به نرخ روز</h2>
                <p>تعدیل مبلغ مهریه ریالی قیدشده در عقدنامه طبق تبصره الحاقی به ماده ۱۰۸۲ قانون مدنی و جدول شاخص‌های بانک مرکزی</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label htmlFor={mahrInputId}>مبلغ مهریه وجه نقد در سند نکاحیه (تومان)</label>
                  <div className="input-with-badge">
                    <input
                      id={mahrInputId}
                      type="text"
                      className="calc-input"
                      value={formatPersianNumber(mahrAmount)}
                      onChange={(e) => setMahrAmountStr(e.target.value)}
                      placeholder="مثال: ۱۰،۰۰۰،۰۰۰"
                    />
                    <span className="input-unit">تومان</span>
                  </div>
                  <span className="input-hint">توجه: این فرمول صرفاً برای مهریه وجه نقد است (نه سکه طلا).</span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor={mahrMarriageYearSelectId}>سال وقوع عقد ازدواج</label>
                    <select
                      id={mahrMarriageYearSelectId}
                      className="calc-select"
                      value={marriageYear}
                      onChange={(e) => setMarriageYear(e.target.value)}
                    >
                      {yearsList.map((y) => (
                        <option key={y} value={y}>
                          سال {formatPersianNumber(y)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={mahrSettleYearSelectId}>سال مطالبه / فوت همسر</label>
                    <select
                      id={mahrSettleYearSelectId}
                      className="calc-select"
                      value={settleYear}
                      onChange={(e) => setSettleYear(e.target.value)}
                    >
                      {yearsList.map((y) => (
                        <option key={y} value={y}>
                          سال {formatPersianNumber(y)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="calc-result-pane">
                <div className="result-box">
                  <span className="result-label">ارزش روز مهریه وجه نقد:</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(mahrUpdatedValue)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-breakdown">
                    <div className="breakdown-row">
                      <span>مبلغ اولیه در عقدنامه:</span>
                      <strong>{formatPersianNumber(mahrAmount)} تومان</strong>
                    </div>
                    <div className="breakdown-row">
                      <span>ضریب تورم دوره:</span>
                      <strong>{(mahrSettleIndex / mahrMarriageIndex).toFixed(2)} برابر</strong>
                    </div>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `مهریه اولیه سال ${marriageYear}: ${formatPersianNumber(mahrAmount)} تومان\nارزش روز سال ${settleYear}: ${formatPersianNumber(mahrUpdatedValue)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی نتیجه</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه مهریه به نرخ روز',
                        `مهریه عقد سال ${marriageYear}: ${formatPersianNumber(mahrAmount)} تومان\nارزش روز سال ${settleYear}: ${formatPersianNumber(mahrUpdatedValue)} تومان`
                      )
                    }
                  >
                    <Share2 size={16} />
                    <span>ارسال در واتساپ</span>
                  </button>
                </div>

                <div className="lawyer-cta-box">
                  <div className="cta-avatar">
                    <HeartHandshake size={20} />
                  </div>
                  <div className="cta-text">
                    <strong>مشاوره تخصصی دعاوی خانواده و مهریه</strong>
                    <p>جهت اجرای مهریه از طریق ثبت، ممنوع‌الخروجی، توقیف ملک و پلاک ثبتی همراه شما هستیم.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>تماس با وکیل</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>نکته مهم در فوت شوهر:</span>
              </h3>
              <p>
                در صورتی که مطالبه مهریه پس از فوت شوهر باشد، بر اساس قانون ملاک محاسبه شاخص تورم سال قبل از فوت همسر است نه سال مطالبه توسط زوجه.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Attorney Fee Calculator */}
        {activeTab === 'attorneyFee' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <Briefcase size={24} />
              </div>
              <div>
                <h2>محاسبه حق‌الوکاله وکیل طبق تعرفه قانونی</h2>
                <p>محاسبه سقف و کف تعرفه مصوب آیین‌نامه حق‌الوکاله کانون وکلای دادگستری و قوه قضاییه</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label htmlFor={feeClaimInputId}>بهای خواسته یا مبلغ محکوم‌به (تومان)</label>
                  <div className="input-with-badge">
                    <input
                      id={feeClaimInputId}
                      type="text"
                      className="calc-input"
                      value={formatPersianNumber(feeClaim)}
                      onChange={(e) => setFeeClaimStr(e.target.value)}
                      placeholder="مثال: ۳۰۰،۰۰۰،۰۰۰"
                    />
                    <span className="input-unit">تومان</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>مرحله رسیدگی</label>
                  <div className="calc-options-grid stages">
                    <button
                      type="button"
                      className={`calc-opt-btn ${feeStage === 'both' ? 'selected' : ''}`}
                      onClick={() => setFeeStage('both')}
                    >
                      <strong>بدوی و تجدیدنظر توأمان</strong>
                      <small>۱۰۰٪ تعرفه آیین‌نامه</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${feeStage === 'first' ? 'selected' : ''}`}
                      onClick={() => setFeeStage('first')}
                    >
                      <strong>صرفاً مرحله بدوی</strong>
                      <small>۶۰٪ تعرفه کل</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${feeStage === 'appeal' ? 'selected' : ''}`}
                      onClick={() => setFeeStage('appeal')}
                    >
                      <strong>صرفاً مرحله تجدیدنظر</strong>
                      <small>۴۰٪ تعرفه کل</small>
                    </button>
                  </div>
                </div>
              </div>

              <div className="calc-result-pane">
                <div className="result-box">
                  <span className="result-label">حق‌الوکاله مصوب طبق تعرفه قانونی:</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(calculatedLawyerFee)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-sub-detail">
                    <CheckCircle2 size={14} />
                    <span>{feeStageDesc}</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `تعرفه حق‌الوکاله برای خواسته ${formatPersianNumber(feeClaim)} تومان: ${formatPersianNumber(calculatedLawyerFee)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی تعرفه</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'تعرفه قانونی حق‌الوکاله وکیل',
                        `خواسته: ${formatPersianNumber(feeClaim)} تومان\nتعرفه مصوب: ${formatPersianNumber(calculatedLawyerFee)} تومان`
                      )
                    }
                  >
                    <Share2 size={16} />
                    <span>ارسال در واتساپ</span>
                  </button>
                </div>

                <div className="lawyer-cta-box">
                  <div className="cta-avatar">
                    <Scale size={20} />
                  </div>
                  <div className="cta-text">
                    <strong>توافق حق‌الوکاله متناسب با شرایط پرونده</strong>
                    <p>در دفتر وکالت پرستو خوئینی، حق‌الوکاله منصفانه و به صورت مرحله‌ای تنظیم می‌شود.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>تعیین وقت مشاوره</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>تعرفه و قرارداد خصوصی:</span>
              </h3>
              <p>
                طبق ماده ۱۰ قانون مدنی و ماده ۱۹ لایحه قانونی استقلال کانون وکلا، قرارداد مالی خصوصی بین وکیل و موکل معتبر و نافذ است؛ اما تعرفه قانونی فوق مبنای خسارت حق‌الوکاله قابل دریافت از طرف مقابل در دادگاه خواهد بود.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Real Estate Contract Risk Checklist */}
        {activeTab === 'realEstateChecklist' && (
          <div role="tabpanel" aria-label="چک‌لیست هوشمند ریسک مبایعه‌نامه">
            <RealEstateRiskChecklist />
          </div>
        )}

        {/* Automatic internal links to the topics these calculators cover */}
        <div className="related-block">
          <h2 className="related-title">مطالعه بیشتر درباره محاسبات و هزینه‌های حقوقی</h2>
          <div className="related-articles-list">
            {summaryLinks.articles.map((a) => (
              <Link to={`/maghalat/${a.id}`} key={a.id} className="related-article-card">
                <span className="related-article-cat">{a.category}</span>
                <span className="related-article-title">{a.title}</span>
              </Link>
            ))}
          </div>
          <div className="related-services-list">
            {summaryLinks.services.map((s) => (
              <Link to={`/khadamat/${s.id}`} key={s.id} className="related-service-card">
                <span className="related-service-title">{s.title}</span>
                <span className="related-service-desc">{s.description}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Traffic Magnet FAQs */}
        <div className="calc-faq-section">
          <div className="section-head center">
            <h2 className="section-title">پرسش‌های پرتکرار درباره هزینه‌ها و محاسبات قضایی</h2>
            <p className="section-subtitle">پاسخ‌های شفاف وکیل پایه یک به متداول‌ترین سوالات موکلین</p>
          </div>

          <div className="calc-faq-grid">
            <div className="faq-card">
              <h3>
                <HelpCircle size={18} />
                <span>آیا هزینه دادرسی پرداخت‌شده از طرف مقابل پس گرفته می‌شود؟</span>
              </h3>
              <p>
                بله، در صورت پیروزی در دعوا، دادگاه خوانده را به پرداخت کلیه خسارات دادرسی شامل هزینه تمبر، کارشناسی و حق‌الوکاله وکیل طبق تعرفه در حق خواهان محکوم می‌نماید.
              </p>
            </div>
            <div className="faq-card">
              <h3>
                <HelpCircle size={18} />
                <span>خسارت تأخیر تأدیه چک از چه تاریخی محاسبه می‌شود؟</span>
              </h3>
              <p>
                بر اساس رای وحدت رویه شماره ۸۵۵ هیئت عمومی دیوان عالی کشور و قانون صدور چک، خسارت تأخیر تأدیه چک از تاریخ سررسید مندرج در متن چک محاسبه می‌شود نه تاریخ برگشت در بانک.
              </p>
            </div>
            <div className="faq-card">
              <h3>
                <HelpCircle size={18} />
                <span>آیا اعسار از هزینه دادرسی نیاز به شاهد دارد؟</span>
              </h3>
              <p>
                بله، دادخواست اعسار نیازمند ضمیمه کردن استشهادیه کتبی دو نفر شاهد مطلع از وضعیت مالی متقاضی به انضمام لیست کلیه حساب‌های بانکی و دارایی‌ها می‌باشد.
              </p>
            </div>
            <div className="faq-card">
              <h3>
                <HelpCircle size={18} />
                <span>چرا برای مهریه وجه نقد از شاخص بانک مرکزی استفاده می‌شود؟</span>
              </h3>
              <p>
                به دلیل تورم سالیانه و کاهش شدید ارزش پول، قانون‌گذار برای برقراری عدالت اقتصادی مقرر کرده که مهریه ریالی با فرمول شاخص تورم بانک مرکزی تعدیل و پرداخت شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
