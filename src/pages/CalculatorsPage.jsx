import { useState, useEffect, useId } from 'react'
import { lawyer } from '../data/content.js'
import { articlesForTopic, servicesForTopic } from '../data/related.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import { useToast } from '../context/ToastContext.jsx'
import {
  cpiAnnualIndexes,
  formatPersianNumber,
  formatPersianDecimal,
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
  Users,
  Activity,
  Building2,
  Percent,
  Coins,
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

  // 5. Inheritance State (محاسبه آنلاین سهم‌الارث)
  const [estateTotalStr, setEstateTotalStr] = useState('1000000000') // 1 billion Tomans
  const [deceasedGender, setDeceasedGender] = useState('male') // 'male' or 'female'
  const [hasSpouse, setHasSpouse] = useState(true)
  const [hasFather, setHasFather] = useState(true)
  const [hasMother, setHasMother] = useState(true)
  const [sonsCount, setSonsCount] = useState(2)
  const [daughtersCount, setDaughtersCount] = useState(1)
  const estateTotal = parseNumberInput(estateTotalStr)

  // 6. Real Estate Commission State (کمیسیون املاک)
  const [dealType, setDealType] = useState('buy-sell') // 'buy-sell' or 'rent'
  const [propertyPriceStr, setPropertyPriceStr] = useState('5000000000') // 5 Billion Tomans
  const [rentDepositStr, setRentDepositStr] = useState('300000000') // 300M deposit
  const [monthlyRentStr, setMonthlyRentStr] = useState('15000000') // 15M rent
  const propertyPrice = parseNumberInput(propertyPriceStr)
  const rentDeposit = parseNumberInput(rentDepositStr)
  const monthlyRent = parseNumberInput(monthlyRentStr)

  // 7. Diya State (دیه ۱۴۰۴ و ۱۴۰۵)
  const [diyaYear, setDiyaYear] = useState('1404')
  const [isHaramMonth, setIsHaramMonth] = useState(false)
  const [diyaPercentMode, setDiyaPercentMode] = useState('percent') // 'percent' or 'injury'
  const [diyaPercentStr, setDiyaPercentStr] = useState('5') // 5 percent
  const [selectedInjury, setSelectedInjury] = useState('mouzeheh')
  const diyaPercent = parseFloat(diyaPercentStr) || 0

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

  // 5. Inheritance Calculations (مواد ۸۶۱ تا ۹۴۹ قانون مدنی)
  const totalChildren = sonsCount + daughtersCount
  const hasChildren = totalChildren > 0
  let spouseRatio = 0
  let spouseTitle = deceasedGender === 'male' ? 'همسر متوفی (زوجه)' : 'همسر متوفی (زوج)'
  let spouseRatioText = ''
  if (hasSpouse) {
    if (deceasedGender === 'male') {
      spouseRatio = hasChildren ? 1 / 8 : 1 / 4
      spouseRatioText = hasChildren ? 'یک‌هشتم (به دلیل وجود فرزند)' : 'یک‌چهارم (به دلیل عدم وجود فرزند)'
    } else {
      spouseRatio = hasChildren ? 1 / 4 : 1 / 2
      spouseRatioText = hasChildren ? 'یک‌چهارم (به دلیل وجود فرزند)' : 'یک‌دوم (به دلیل عدم وجود فرزند)'
    }
  }
  const spouseShareAmount = Math.round(estateTotal * spouseRatio)

  let fatherRatio = 0
  let fatherRatioText = ''
  if (hasFather) {
    if (hasChildren) {
      fatherRatio = 1 / 6
      fatherRatioText = 'یک‌ششم (فرض قانونی با وجود فرزند)'
    } else {
      fatherRatio = 0
      fatherRatioText = 'مابقی ترکه پس از کسر سهم همسر و مادر'
    }
  }
  let fatherShareAmount = hasChildren ? Math.round(estateTotal * fatherRatio) : 0

  let motherRatio = 0
  let motherRatioText = ''
  if (hasMother) {
    if (hasChildren) {
      motherRatio = 1 / 6
      motherRatioText = 'یک‌ششم (فرض قانونی با وجود فرزند)'
    } else {
      motherRatio = 1 / 3
      motherRatioText = 'یک‌سوم از کل ترکه'
    }
  }
  let motherShareAmount = Math.round(estateTotal * motherRatio)

  if (!hasChildren && hasFather) {
    fatherShareAmount = Math.max(0, estateTotal - spouseShareAmount - motherShareAmount)
    if (!hasMother) {
      fatherRatioText = hasSpouse ? 'مابقی ترکه پس از سهم همسر' : 'تمام ترکه به قرابت'
    }
  } else if (!hasChildren && !hasFather && hasMother) {
    motherShareAmount = Math.max(0, estateTotal - spouseShareAmount)
    motherRatioText = hasSpouse ? 'مابقی کل ترکه پس از سهم همسر (به فرض و رد)' : 'تمام ترکه (به فرض و رد)'
  }

  const remainderForChildren = Math.max(0, estateTotal - spouseShareAmount - fatherShareAmount - motherShareAmount)
  const childShareUnits = sonsCount * 2 + daughtersCount
  const singleUnitAmount = childShareUnits > 0 ? remainderForChildren / childShareUnits : 0
  const singleSonAmount = Math.round(singleUnitAmount * 2)
  const singleDaughterAmount = Math.round(singleUnitAmount)
  const totalSonsAmount = singleSonAmount * sonsCount
  const totalDaughtersAmount = singleDaughterAmount * daughtersCount

  // 6. Real Estate Commission Calculation
  let pureCommissionPerParty = 0
  let commissionFormulaDesc = ''
  let equivalentMonthlyRent = 0
  if (dealType === 'buy-sell') {
    pureCommissionPerParty = propertyPrice * 0.0025
    commissionFormulaDesc = '۰.۲۵ درصد از کل ارزش معامله از هر طرف'
  } else {
    equivalentMonthlyRent = (rentDeposit / 1000000) * 30000
    const totalMonthlySum = monthlyRent + equivalentMonthlyRent
    pureCommissionPerParty = totalMonthlySum * 0.25
    commissionFormulaDesc = 'تبدیل ودیعه به اجاره (هر ۱ میلیون = ۳۰ هزار تومان) + ۲۵٪ اجاره ماهانه'
  }
  const commissionVat = pureCommissionPerParty * 0.10
  const totalCommissionPerParty = pureCommissionPerParty + commissionVat
  const totalCommissionBoth = totalCommissionPerParty * 2

  // 7. Diya Calculations
  const baseDiyaFull = diyaYear === '1404' ? 1200000000 : 1600000000
  const fullDiyaWithMonth = isHaramMonth ? Math.round(baseDiyaFull * 4 / 3) : baseDiyaFull
  let finalDiyaPercent = diyaPercent
  let injuryDesc = 'درصد انتخابی'
  if (diyaPercentMode === 'injury') {
    if (selectedInjury === 'hariseh') {
      finalDiyaPercent = 0.5
      injuryDesc = 'حارصه (خراشیدگی پوست بدون خونریزی - ۰.۵٪)'
    } else if (selectedInjury === 'damieh') {
      finalDiyaPercent = 1
      injuryDesc = 'دامیه (جراحت با خونریزی اندک - ۱٪)'
    } else if (selectedInjury === 'motehlahemeh') {
      finalDiyaPercent = 2
      injuryDesc = 'متلاحمه (بریدگی عمیق گوشت - ۲٪)'
    } else if (selectedInjury === 'samhaq') {
      finalDiyaPercent = 3
      injuryDesc = 'سمحاق (رسیدن جراحت به غشای استخوان - ۳٪)'
    } else if (selectedInjury === 'mouzeheh') {
      finalDiyaPercent = 5
      injuryDesc = 'موضحه (نمایان شدن استخوان سر و صورت - ۵٪)'
    } else if (selectedInjury === 'hashemeh') {
      finalDiyaPercent = 10
      injuryDesc = 'هاشمه (شکستگی استخوان سر و صورت - ۱۰٪)'
    } else if (selectedInjury === 'bone-fracture') {
      finalDiyaPercent = 8
      injuryDesc = 'شکستگی استخوان دست یا پا با جوش خوردن مطلوب (۸٪)'
    }
  }
  const calculatedDiyaTomans = Math.round(fullDiyaWithMonth * (finalDiyaPercent / 100))
  const calculatedDiyaRials = calculatedDiyaTomans * 10

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
      ? 'چک‌لیست ریسک خرید ملک و مبایعه‌نامه | وکیل حقوقی تهران - ۰۹۱۲۸۷۵۴۱۷۷'
      : 'محاسبه هزینه دادرسی و مهریه | ابزارهای وکیل تهران (پرستو خوئینی) - ۰۹۱۲۸۷۵۴۱۷۷',
    description: isChecklistTab
      ? 'ارزیابی آنلاین ریسک حقوقی مبایعه‌نامه و خرید ملک با وکیل حقوقی در تهران؛ پرستو خوئینی. شماره تماس مستقیم: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).'
      : 'سامانه رایگان محاسبه آنلاین هزینه دادرسی و مهریه به نرخ روز زیر نظر وکیل حقوقی تهران، پرستو خوئینی. شماره تماس: ۰۹۱۲۸۷۵۴۱۷۷ (09128754177).',
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
            aria-selected={activeTab === 'inheritance'}
            className={`calc-tab-btn ${activeTab === 'inheritance' ? 'active' : ''}`}
            onClick={() => setActiveTab('inheritance')}
          >
            <Users size={18} />
            <span>محاسبه سهم‌الارث</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'commission'}
            className={`calc-tab-btn ${activeTab === 'commission' ? 'active' : ''}`}
            onClick={() => setActiveTab('commission')}
          >
            <Building2 size={18} />
            <span>کمیسیون املاک</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'diya'}
            className={`calc-tab-btn ${activeTab === 'diya' ? 'active' : ''}`}
            onClick={() => setActiveTab('diya')}
          >
            <Activity size={18} />
            <span>نرخ دیه ۱۴۰۴ و ۱۴۰۵</span>
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

        {/* Tab: Inheritance Calculator */}
        {activeTab === 'inheritance' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <Users size={24} />
              </div>
              <div>
                <h2>محاسبه آنلاین سهم‌الارث و طبقات ارث (قانون مدنی)</h2>
                <p>تقسیم قانونی ماترک متوفی میان همسر، والدین، فرزندان دختر و پسر بر اساس احکام مدنی و فقهی</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label htmlFor="estate-total-input">مجموع ارزش ماترک و اموال متوفی (تومان):</label>
                  <div className="input-with-badge">
                    <input
                      id="estate-total-input"
                      type="text"
                      className="calc-input"
                      value={formatPersianNumber(estateTotal)}
                      onChange={(e) => setEstateTotalStr(e.target.value)}
                    />
                    <span className="input-unit">تومان</span>
                  </div>
                  <div className="calc-preset-chips">
                    {[100000000, 500000000, 1000000000, 3000000000, 10000000000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className="preset-chip"
                        onClick={() => setEstateTotalStr(String(preset))}
                      >
                        {formatPersianNumber(preset / 1000000)} میلیون
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>جنسیت متوفی:</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${deceasedGender === 'male' ? 'selected' : ''}`}
                        onClick={() => setDeceasedGender('male')}
                      >
                        <strong>مرد (دارای زوجه)</strong>
                        <small>سهم زوجه: ۱/۸ یا ۱/۴</small>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${deceasedGender === 'female' ? 'selected' : ''}`}
                        onClick={() => setDeceasedGender('female')}
                      >
                        <strong>زن (دارای زوج)</strong>
                        <small>سهم زوج: ۱/۴ یا ۱/۲</small>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>وضعیت همسر متوفی:</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${hasSpouse ? 'selected' : ''}`}
                        onClick={() => setHasSpouse(true)}
                      >
                        <strong>در قید حیات است</strong>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${!hasSpouse ? 'selected' : ''}`}
                        onClick={() => setHasSpouse(false)}
                      >
                        <strong>فوت شده / ندارد</strong>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>پدر متوفی:</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${hasFather ? 'selected' : ''}`}
                        onClick={() => setHasFather(true)}
                      >
                        <strong>در قید حیات</strong>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${!hasFather ? 'selected' : ''}`}
                        onClick={() => setHasFather(false)}
                      >
                        <strong>فوت شده</strong>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>مادر متوفی:</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${hasMother ? 'selected' : ''}`}
                        onClick={() => setHasMother(true)}
                      >
                        <strong>در قید حیات</strong>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${!hasMother ? 'selected' : ''}`}
                        onClick={() => setHasMother(false)}
                      >
                        <strong>فوت شده</strong>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="sons-count-select">تعداد پسران:</label>
                    <select
                      id="sons-count-select"
                      className="calc-select"
                      value={sonsCount}
                      onChange={(e) => setSonsCount(Number(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n === 0 ? 'بدون فرزند پسر' : `${formatPersianNumber(n)} پسر`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="daughters-count-select">تعداد دختران:</label>
                    <select
                      id="daughters-count-select"
                      className="calc-select"
                      value={daughtersCount}
                      onChange={(e) => setDaughtersCount(Number(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n === 0 ? 'بدون فرزند دختر' : `${formatPersianNumber(n)} دختر`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="calc-result-pane">
                <div className="result-box highlight">
                  <span className="result-label">جدول تفکیک سهم‌الارث قانونی وراث:</span>
                  <div className="inheritance-breakdown-list">
                    {hasSpouse && (
                      <div className="heir-result-row">
                        <div className="heir-name">
                          <strong>{spouseTitle}</strong>
                          <small>{spouseRatioText}</small>
                        </div>
                        <div className="heir-val">
                          <span>{formatPersianNumber(spouseShareAmount)}</span>
                          <span className="unit">تومان</span>
                        </div>
                      </div>
                    )}

                    {hasFather && (
                      <div className="heir-result-row">
                        <div className="heir-name">
                          <strong>پدر متوفی</strong>
                          <small>{fatherRatioText}</small>
                        </div>
                        <div className="heir-val">
                          <span>{formatPersianNumber(fatherShareAmount)}</span>
                          <span className="unit">تومان</span>
                        </div>
                      </div>
                    )}

                    {hasMother && (
                      <div className="heir-result-row">
                        <div className="heir-name">
                          <strong>مادر متوفی</strong>
                          <small>{motherRatioText}</small>
                        </div>
                        <div className="heir-val">
                          <span>{formatPersianNumber(motherShareAmount)}</span>
                          <span className="unit">تومان</span>
                        </div>
                      </div>
                    )}

                    {sonsCount > 0 && (
                      <div className="heir-result-row">
                        <div className="heir-name">
                          <strong>سهم هر پسر ({formatPersianNumber(sonsCount)} نفر)</strong>
                          <small>مجموعاً: {formatPersianNumber(totalSonsAmount)} تومان</small>
                        </div>
                        <div className="heir-val">
                          <span>{formatPersianNumber(singleSonAmount)}</span>
                          <span className="unit">تومان (به ازای هر نفر)</span>
                        </div>
                      </div>
                    )}

                    {daughtersCount > 0 && (
                      <div className="heir-result-row">
                        <div className="heir-name">
                          <strong>سهم هر دختر ({formatPersianNumber(daughtersCount)} نفر)</strong>
                          <small>مجموعاً: {formatPersianNumber(totalDaughtersAmount)} تومان</small>
                        </div>
                        <div className="heir-val">
                          <span>{formatPersianNumber(singleDaughterAmount)}</span>
                          <span className="unit">تومان (به ازای هر نفر)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `تقسیم ماترک ${formatPersianNumber(estateTotal)} تومان:\nهمسر: ${formatPersianNumber(spouseShareAmount)} تومان\nپدر: ${formatPersianNumber(fatherShareAmount)} تومان\nمادر: ${formatPersianNumber(motherShareAmount)} تومان\nسهم هر پسر: ${formatPersianNumber(singleSonAmount)} تومان\nسهم هر دختر: ${formatPersianNumber(singleDaughterAmount)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی جدول تقسیم ارث</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه آنلاین سهم‌الارث قانونی',
                        `ارزش کل ترکه: ${formatPersianNumber(estateTotal)} تومان\nسهم همسر: ${formatPersianNumber(spouseShareAmount)} تومان\nسهم هر پسر: ${formatPersianNumber(singleSonAmount)} تومان\nسهم هر دختر: ${formatPersianNumber(singleDaughterAmount)} تومان`
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
                    <strong>اخذ فوری گواهی انحصار وراثت و تحریر ترکه</strong>
                    <p>پیگیری کلیه امور انحصار وراثت و تقسیم اموال بدون نیاز به حضور تمام وراث توسط وکیل پایه یک.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>مشاوره انحصار وراثت</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>مستند قانونی تقسیم ترکه (قانون مدنی):</span>
              </h3>
              <p>
                طبق مواد ۹۰۰ و ۹۱۳ قانون مدنی، سهم زوجه در صورت وجود فرزند یک‌هشتم و بدون فرزند یک‌چهارم است. همچنین طبق ماده ۹۰۷ قانون مدنی، اگر متوفی چند پسر و دختر داشته باشد، سهم هر پسر دو برابر هر دختر خواهد بود (للذکر مثل حظ الانثیین). قبل از تقسیم، پرداخت دیون، مهریه و وصایای متوفی (تا ثلث ترکه) مقدم بر ارث است.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Real Estate Commission */}
        {activeTab === 'commission' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <Building2 size={24} />
              </div>
              <div>
                <h2>محاسبه کمیسیون مشاور املاک (خرید، فروش، رهن و اجاره تهران)</h2>
                <p>محاسبه قانونی و مصوب کمیسیون آژانس‌های املاک طبق نرخنامه رسمی اتحادیه و ۱۰٪ مالیات بر ارزش افزوده</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-group">
                  <label>نوع معامله ملکی:</label>
                  <div className="calc-options-grid">
                    <button
                      type="button"
                      className={`calc-opt-btn ${dealType === 'buy-sell' ? 'selected' : ''}`}
                      onClick={() => setDealType('buy-sell')}
                    >
                      <strong>خرید و فروش ملک</strong>
                      <small>۰.۲۵٪ از کل ثمن معامله از هر طرف</small>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${dealType === 'rent' ? 'selected' : ''}`}
                      onClick={() => setDealType('rent')}
                    >
                      <strong>رهن و اجاره مسکن</strong>
                      <small>تبدیل ودیعه + ۲۵٪ از اجاره ماهانه</small>
                    </button>
                  </div>
                </div>

                {dealType === 'buy-sell' ? (
                  <div className="form-group">
                    <label htmlFor="prop-price-input">قیمت کل ملک / ارزش معامله (تومان):</label>
                    <div className="input-with-badge">
                      <input
                        id="prop-price-input"
                        type="text"
                        className="calc-input"
                        value={formatPersianNumber(propertyPrice)}
                        onChange={(e) => setPropertyPriceStr(e.target.value)}
                      />
                      <span className="input-unit">تومان</span>
                    </div>
                    <div className="calc-preset-chips">
                      {[1000000000, 3000000000, 5000000000, 10000000000, 20000000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className="preset-chip"
                          onClick={() => setPropertyPriceStr(String(preset))}
                        >
                          {formatPersianNumber(preset / 1000000000)} میلیارد
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="rent-deposit-input">مبلغ ودیعه / پول پیش (تومان):</label>
                      <div className="input-with-badge">
                        <input
                          id="rent-deposit-input"
                          type="text"
                          className="calc-input"
                          value={formatPersianNumber(rentDeposit)}
                          onChange={(e) => setRentDepositStr(e.target.value)}
                        />
                        <span className="input-unit">تومان</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="monthly-rent-input">مبلغ اجاره‌بهای ماهانه (تومان):</label>
                      <div className="input-with-badge">
                        <input
                          id="monthly-rent-input"
                          type="text"
                          className="calc-input"
                          value={formatPersianNumber(monthlyRent)}
                          onChange={(e) => setMonthlyRentStr(e.target.value)}
                        />
                        <span className="input-unit">تومان</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="calc-result-pane">
                <div className="result-box highlight">
                  <span className="result-label">سهم پرداختی هر یک از طرفین (خریدار یا فروشنده / مستأجر یا موجر):</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(totalCommissionPerParty)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-breakdown-details">
                    <div className="detail-line">
                      <span>حق کمیسیون خالص قانونی:</span>
                      <strong>{formatPersianNumber(pureCommissionPerParty)} تومان</strong>
                    </div>
                    <div className="detail-line">
                      <span>مالیات بر ارزش افزوده (۱۰٪):</span>
                      <strong>{formatPersianNumber(commissionVat)} تومان</strong>
                    </div>
                    <div className="detail-line total">
                      <span>مجموع کل دریافتی مشاور املاک از هر دو طرف:</span>
                      <strong>{formatPersianNumber(totalCommissionBoth)} تومان</strong>
                    </div>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `کمیسیون قانونی هر طرف: ${formatPersianNumber(totalCommissionPerParty)} تومان (شامل ${formatPersianNumber(pureCommissionPerParty)} تومان حق‌الزحمه + ${formatPersianNumber(commissionVat)} تومان مالیات ۱۰٪)`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی کمیسیون</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه کمیسیون مشاور املاک',
                        `کمیسیون قانونی هر طرف: ${formatPersianNumber(totalCommissionPerParty)} تومان\nمجموع کمیسیون دو طرف: ${formatPersianNumber(totalCommissionBoth)} تومان`
                      )
                    }
                  >
                    <Share2 size={16} />
                    <span>ارسال در واتساپ</span>
                  </button>
                </div>

                <div className="lawyer-cta-box">
                  <div className="cta-avatar">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="cta-text">
                    <strong>بررسی حقوقی مبایعه‌نامه قبل از پرداخت کمیسیون</strong>
                    <p>پیش از امضای هر سند و پرداخت وجه، با وکیل متخصص ملکی شروط فسخ و اصالت سند را بسنجید.</p>
                  </div>
                  <Link to="/checklist-mobayenameh" className="cta-call-btn">
                    <span>چک‌لیست ریسک ملک</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>فرمول رسمی اتحادیه مشاوران املاک:</span>
              </h3>
              <p>
                طبق آخرین مصوبه کمیسیون نظارت و اتحادیه املاک تهران، تعرفه حق‌الزحمه خرید و فروش ۰.۲۵ درصد از بهای کل معامله از هر طرف قرارداد است. در قراردادهای اجاره، هر ۱ میلیون تومان ودیعه معادل ۳۰ هزار تومان اجاره ماهانه تبدیل شده و ۲۵ درصد اجاره یک ماه به عنوان کمیسیون از هر طرف دریافت می‌شود. دریافت مبالغ بیشتر تحت عنوان شیرینی یا حق سرویس تخلف صنفی محسوب می‌گردد.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Diya Calculator */}
        {activeTab === 'diya' && (
          <div className="calc-card" role="tabpanel">
            <div className="calc-card-header">
              <div className="calc-icon-wrap">
                <Activity size={24} />
              </div>
              <div>
                <h2>محاسبه نرخ دیه سال ۱۴۰۴ و ۱۴۰۵ (ماه حرام و عادی)</h2>
                <p>محاسبه ریالی و تومانی دیه کامل انسان، درصدهای دیه و ارش جراحات پزشکی قانونی</p>
              </div>
            </div>

            <div className="calc-grid">
              <div className="calc-form-pane">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>سال وقوع حادثه:</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${diyaYear === '1404' ? 'selected' : ''}`}
                        onClick={() => setDiyaYear('1404')}
                      >
                        <strong>سال ۱۴۰۴</strong>
                        <small>دیه کامل: ۱.۲ میلیارد تومان</small>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${diyaYear === '1405' ? 'selected' : ''}`}
                        onClick={() => setDiyaYear('1405')}
                      >
                        <strong>سال ۱۴۰۵</strong>
                        <small>دیه کامل: ۱.۶ میلیارد تومان</small>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>ماه وقوع حادثه (تغلیظ دیه):</label>
                    <div className="calc-options-grid">
                      <button
                        type="button"
                        className={`calc-opt-btn ${!isHaramMonth ? 'selected' : ''}`}
                        onClick={() => setIsHaramMonth(false)}
                      >
                        <strong>ماه‌های عادی سال</strong>
                        <small>دیه بدون تغلیظ</small>
                      </button>
                      <button
                        type="button"
                        className={`calc-opt-btn ${isHaramMonth ? 'selected' : ''}`}
                        onClick={() => setIsHaramMonth(true)}
                      >
                        <strong>ماه‌های حرام (رجب، ذی‌القعده، ذی‌الحجه، محرم)</strong>
                        <small>افزایش ۱/۳ (تغلیظ دیه)</small>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>روش محاسبه دیه:</label>
                  <div className="calc-options-grid">
                    <button
                      type="button"
                      className={`calc-opt-btn ${diyaPercentMode === 'percent' ? 'selected' : ''}`}
                      onClick={() => setDiyaPercentMode('percent')}
                    >
                      <strong>درصد مشخص‌شده در گواهی پزشکی قانونی</strong>
                    </button>
                    <button
                      type="button"
                      className={`calc-opt-btn ${diyaPercentMode === 'injury' ? 'selected' : ''}`}
                      onClick={() => setDiyaPercentMode('injury')}
                    >
                      <strong>انتخاب از جراحات و شکستگی‌های متداول</strong>
                    </button>
                  </div>
                </div>

                {diyaPercentMode === 'percent' ? (
                  <div className="form-group">
                    <label htmlFor="diya-percent-input">درصد دیه (مثلاً ۱ یا ۵ یا ۲.۵):</label>
                    <div className="input-with-badge">
                      <input
                        id="diya-percent-input"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100"
                        className="calc-input"
                        value={diyaPercentStr}
                        onChange={(e) => setDiyaPercentStr(e.target.value)}
                      />
                      <span className="input-unit">درصد</span>
                    </div>
                    <div className="calc-preset-chips">
                      {[0.5, 1, 2, 3, 5, 8, 10, 20, 50, 100].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className="preset-chip"
                          onClick={() => setDiyaPercentStr(String(preset))}
                        >
                          {formatPersianDecimal(preset)}٪
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="diya-injury-select">نوع جراحت طبق قانون مجازات اسلامی:</label>
                    <select
                      id="diya-injury-select"
                      className="calc-select"
                      value={selectedInjury}
                      onChange={(e) => setSelectedInjury(e.target.value)}
                    >
                      <option value="hariseh">حارصه: خراشیدگی پوست بدون خونریزی (۰.۵ درصد)</option>
                      <option value="damieh">دامیه: جراحت با جریان اندک خون (۱ درصد)</option>
                      <option value="motehlahemeh">متلاحمه: بریدگی عمیق گوشت بدون رسیدن به استخوان (۲ درصد)</option>
                      <option value="samhaq">سمحاق: رسیدن جراحت به غشای نازک استخوان (۳ درصد)</option>
                      <option value="mouzeheh">موضحه: نمایان شدن سفیدی استخوان سر و صورت (۵ درصد)</option>
                      <option value="hashemeh">هاشمه: شکستگی استخوان سر و صورت (۱۰ درصد)</option>
                      <option value="bone-fracture">شکستگی استخوان دست یا پا با جوش خوردن مطلوب (۸ درصد)</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="calc-result-pane">
                <div className="result-box highlight">
                  <span className="result-label">مبلغ دیه محاسبه‌شده ({formatPersianDecimal(finalDiyaPercent)} درصد):</span>
                  <div className="result-value">
                    <span>{formatPersianNumber(calculatedDiyaTomans)}</span>
                    <span className="result-unit">تومان</span>
                  </div>
                  <div className="result-sub-detail">
                    <span>معادل: {formatPersianNumber(calculatedDiyaRials)} ریال</span>
                  </div>
                  <div className="result-breakdown-details">
                    <div className="detail-line">
                      <span>دیه کامل در {isHaramMonth ? 'ماه حرام' : 'ماه عادی'}:</span>
                      <strong>{formatPersianNumber(fullDiyaWithMonth)} تومان</strong>
                    </div>
                    <div className="detail-line">
                      <span>مبنای محاسبه:</span>
                      <strong>{injuryDesc}</strong>
                    </div>
                  </div>
                </div>

                <div className="result-actions">
                  <button
                    type="button"
                    className="calc-action-btn copy-btn"
                    onClick={() =>
                      copyResultText(
                        `دیه سال ${diyaYear} (${isHaramMonth ? 'ماه حرام' : 'ماه عادی'}): ${formatPersianDecimal(finalDiyaPercent)}٪ = ${formatPersianNumber(calculatedDiyaTomans)} تومان`
                      )
                    }
                  >
                    <Copy size={16} />
                    <span>کپی مبلغ دیه</span>
                  </button>
                  <button
                    type="button"
                    className="calc-action-btn share-btn"
                    onClick={() =>
                      shareToSocial(
                        'whatsapp',
                        'محاسبه نرخ دیه',
                        `سال: ${diyaYear}\nدرصد دیه: ${formatPersianDecimal(finalDiyaPercent)}٪\nمبلغ: ${formatPersianNumber(calculatedDiyaTomans)} تومان`
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
                    <strong>وکالت در تصادفات، حوادث کار و بیمه</strong>
                    <p>پیگیری دریافت بالاترین دیه و ارش از شرکت‌های بیمه و صندوق خسارت‌های بدنی.</p>
                  </div>
                  <a href={lawyer.phoneHref} className="cta-call-btn">
                    <PhoneCall size={14} />
                    <span>مشاوره دیه و تصادفات</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="calc-legal-notes">
              <h3>
                <AlertCircle size={16} />
                <span>مقررات قانونی دیه و ارش:</span>
              </h3>
              <p>
                بر اساس ماده ۵۴۹ قانون مجازات اسلامی، نرخ دیه ابتدای هر سال توسط رئیس قوه قضاییه اعلام می‌گردد. در صورت وقوع صدمه و فوت هر دو در یکی از چهار ماه حرام (رجب، ذی‌القعده، ذی‌الحجه، محرم)، یک‌سوم دیه کامل به عنوان تغلیظ به دیه اضافه می‌شود. در صورتی که جراحت در قانون دیه مقدر نداشته باشد، دادگاه بر اساس نظریه پزشکی قانونی مبلغی تحت عنوان «ارش» تعیین می‌نماید.
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
