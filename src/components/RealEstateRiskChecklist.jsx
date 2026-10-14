import { useState, useMemo } from 'react'
import { lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import { useToast } from '../context/ToastContext.jsx'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Copy,
  Printer,
  PhoneCall,
  FileText,
  ChevronDown,
  Sparkles,
  Info,
} from 'lucide-react'
import './RealEstateRiskChecklist.css'

export default function RealEstateRiskChecklist() {
  const { showToast } = useToast()

  // 1. Ownership & Deed Status (weight: 25)
  const [deedStatus, setDeedStatus] = useState('single-sheet') // 'single-sheet', 'mousha', 'vekalati', 'unknown'

  // 2. Official Pre-inquiries (weight: 20, 5 pts each)
  const [inquiries, setInquiries] = useState({
    registryCheck: true,
    mortgageCheck: true,
    sayadOrKatebCode: true,
    municipalityTaxes: false,
  })

  // 3. Waiver of Options / اسقاط کافه خیارات (weight: 20)
  const [khiaratStatus, setKhiaratStatus] = useState('custom-exempt') // 'custom-exempt', 'full-waiver', 'rescission-clause'

  // 4. Delay Penalty / وجه التزام تاخیر (weight: 15)
  const [penaltyStatus, setPenaltyStatus] = useState('both-balanced') // 'both-balanced', 'one-sided-low', 'none'

  // 5. Specific Appurtenances / پارکینگ و انباری (weight: 10, 2.5 pts each)
  const [appurtenances, setAppurtenances] = useState({
    parkingNumber: true,
    storageNumber: true,
    utilitiesSeparated: true,
    areaDiscrepancyClause: true,
  })

  // 6. Third-party Claim & Inflation Guarantee / مستحق‌للغیر و رای وحدت رویه (weight: 10)
  const [defectClause, setDefectClause] = useState('court-precedent') // 'court-precedent', 'principal-only', 'silent'

  // Toggle helper
  const toggleInquiry = (key) => {
    setInquiries((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleAppurtenance = (key) => {
    setAppurtenances((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Calculate Risk Score (0 to 100)
  const evaluation = useMemo(() => {
    let score = 0
    const redFlags = []
    const recommendations = []

    // 1. Deed Status
    if (deedStatus === 'single-sheet') {
      score += 25
    } else if (deedStatus === 'mousha') {
      score += 12
      redFlags.push('ملک دارای سند مشاعی است؛ خطر عدم امکان تفکیک، دعوای خلع ید یا اعتراض سایر شرکا وجود دارد.')
      recommendations.push('پیش از امضا، تقسیم‌نامه رسمی و استعلام گواهی عدم افراز از اداره ثبت اخذ شود.')
    } else if (deedStatus === 'vekalati') {
      score += 5
      redFlags.push('معامله بر پایه وکالت بلاعزل انجام می‌شود؛ طبق قانون وکالت معادل مالکیت نیست و با فوت یا جنون موکل ساقط می‌شود.')
      recommendations.push('اصل سند مادر رویت شود و الزاماً تعهد به انتقال رسمی با وجه التزام سنگین درج گردد.')
    } else {
      score += 0
      redFlags.push('وضعیت ثبتی ملک نامشخص یا صرفاً برگه دست‌نویس عادی است؛ ریسک فروش مال به غیر بسیار بالا است.')
      recommendations.push('از هرگونه پرداخت بیعانه تا رویت اسناد ثبتی و استعلام قطعی کاتب خودداری فرمایید.')
    }

    // 2. Inquiries
    let inqPoints = 0
    if (inquiries.registryCheck) inqPoints += 5
    else redFlags.push('استعلام تصدیق اصالت سند ثبتی انجام نشده است.')

    if (inquiries.mortgageCheck) inqPoints += 5
    else redFlags.push('استعلام رهن بانک یا بازداشت قضایی ملک انجام نشده است (خطر مزایده توسط بستانکاران فروشنده).')

    if (inquiries.sayadOrKatebCode) inqPoints += 5
    else redFlags.push('کدرهگیری یکتا در سامانه خودنویس یا کاتب دریافت نشده است.')

    if (inquiries.municipalityTaxes) inqPoints += 5
    else recommendations.push('تسویه عوارض نوسازی و بدهی پایان‌کار شهرداری پیش از امضا مطالبه شود.')

    score += inqPoints

    // 3. Khiarat (اسقاط خیارات)
    if (khiaratStatus === 'custom-exempt') {
      score += 20
    } else if (khiaratStatus === 'rescission-clause') {
      score += 18
    } else if (khiaratStatus === 'full-waiver') {
      score += 2
      redFlags.push('بند «اسقاط کافه خیارات ولو غبن فاحش یا افحش» درج شده است؛ در صورت وجود کلاهبرداری، عیب مخفی یا اختلاف فاحش قیمت، حق فسخ شما سلب می‌شود!')
      recommendations.push('صراحتاً قید شود: «به استثنای خیار تدلیس، خیار عیب و خیار تخلف از شرط».')
    }

    // 4. Delay Penalty
    if (penaltyStatus === 'both-balanced') {
      score += 15
    } else if (penaltyStatus === 'one-sided-low') {
      score += 7
      recommendations.push('وجه التزام تاخیر فروشنده در تحویل کلید و تنظیم سند را متناسب با تورم و حداقل معادل اجاره‌بهای روزانه معین کنید.')
    } else {
      score += 0
      redFlags.push('هیچ وجه التزامی برای تاخیر فروشنده در تنظیم سند و تحویل ملک پیش‌بینی نشده است؛ فروشنده انگیزه مالی برای حضور به‌موقع ندارد.')
      recommendations.push('درج وجه التزام روزانه شفاف (مثلاً ۳ الی ۱۰ میلیون تومان به ازای هر روز تاخیر) ضروری است.')
    }

    // 5. Appurtenances
    let appPoints = 0
    if (appurtenances.parkingNumber) appPoints += 2.5
    else recommendations.push('شماره دقیق پارکینگ سندی و موقعیت مزاحم/غیرمزاحم در متن مبایعه‌نامه تصریح شود.')

    if (appurtenances.storageNumber) appPoints += 2.5
    else recommendations.push('شماره و مساحت دقیق انباری سندی مشخص گردد.')

    if (appurtenances.utilitiesSeparated) appPoints += 2.5
    if (appurtenances.areaDiscrepancyClause) appPoints += 2.5
    else recommendations.push('شرط اضافه یا کسری مساحت پس از صورتمجلس تفکیکی بر اساس قیمت متری درج شود.')

    score += appPoints

    // 6. Defect / مستحق‌للغیر
    if (defectClause === 'court-precedent') {
      score += 10
    } else if (defectClause === 'principal-only') {
      score += 4
      redFlags.push('در صورت مستحق‌للغیر درآمدن ملک، فقط اصل ثمن برگشت داده می‌شود که با افت ارزش پول، خریدار متضرر بزرگ خواهد بود.')
      recommendations.push('استناد به رای وحدت رویه شماره ۷۳۳ و ۸۱۱ دیوان عالی کشور جهت الزام فروشنده به پرداخت غرامت به نرخ روز ملک درج شود.')
    } else {
      score += 0
      recommendations.push('حتماً ضمانت‌اجرای کشف فساد یا معامله فضولی و غرامت به نرخ روز ملک قید گردد.')
    }

    // Level classification
    let level = 'high-risk'
    let levelTitle = 'پرریسک و خطرناک'
    let levelColor = '#D92D20'
    let levelBg = '#FEF3F2'

    if (score >= 80) {
      level = 'safe'
      levelTitle = 'کم‌ریسک و استاندارد'
      levelColor = '#0F766E'
      levelBg = '#F0FDFA'
    } else if (score >= 55) {
      level = 'moderate'
      levelTitle = 'ریسک متوسط (نیازمند اصلاح بندها)'
      levelColor = '#B54708'
      levelBg = '#FFFAEB'
    }

    return {
      score: Math.round(score),
      level,
      levelTitle,
      levelColor,
      levelBg,
      redFlags,
      recommendations,
    }
  }, [deedStatus, inquiries, khiaratStatus, penaltyStatus, appurtenances, defectClause])

  // Copy report summary
  const copyReport = () => {
    const text = `📋 نتیجه ارزیابی ریسک مبایعه‌نامه و ملک (دفتر وکالت پرستو خوئینی):
امتیاز ایمنی قرارداد: ${evaluation.score} از ۱۰۰ (${evaluation.levelTitle})

⚠️ هشدارهای بحرانی شناسایی‌شده:
${evaluation.redFlags.length > 0 ? evaluation.redFlags.map((r, i) => `${i + 1}. ${r}`).join('\n') : 'مورد بحرانی حادی یافت نشد.'}

💡 توصیه‌های وکیل پیش از امضا:
${evaluation.recommendations.map((r, i) => `• ${r}`).join('\n')}

🌐 ارزیابی آنلاین در وب‌سایت وکیل خوئینی:
https://vakilkhoini.ir/checklist-mobayenameh`

    navigator.clipboard.writeText(text).then(() => {
      showToast('خلاصه گزارش ارزیابی قرارداد کپی شد')
    })
  }

  const printReport = () => {
    window.print()
  }

  return (
    <div className="risk-checklist-wrapper" id="checklist-tool">
      <div className="risk-header-card">
        <div className="risk-header-badge">
          <Sparkles size={16} />
          <span>ابزار اختصاصی بررسی قراردادهای ملکی ایران</span>
        </div>
        <h2 className="risk-header-title">چک‌لیست هوشمند ارزیابی ریسک مبایعه‌نامه و خرید ملک</h2>
        <p className="risk-header-desc">
          بر اساس مواد ۳۳۸ به بعد قانون مدنی، قانون ثبت، قانون جدید الزام به ثبت رسمی اموال غیرمنقول (مصوب ۱۴۰۳) و آرای وحدت رویه شماره ۷۳۳ و ۸۱۱ دیوان عالی کشور.
        </p>
      </div>

      <div className="risk-body-grid">
        {/* Left / Main form: Checklist items */}
        <div className="risk-form-col">
          {/* Section 1: Deed Status */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۱</span>
              <div>
                <h3>وضعیت سند مالکیت و فروشنده</h3>
                <small>مهم‌ترین رکن اعتبارسنجی معامله</small>
              </div>
            </div>

            <div className="risk-radio-group">
              <label className={`risk-radio-item ${deedStatus === 'single-sheet' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="deedStatus"
                  value="single-sheet"
                  checked={deedStatus === 'single-sheet'}
                  onChange={(e) => setDeedStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>سند رسمی تک‌برگ (حدنگار) به نام شخص فروشنده</strong>
                  <span>فروشنده مالک قطعی و رسمی عرصه و اعیان است (ایمن‌ترین حالت)</span>
                </div>
              </label>

              <label className={`risk-radio-item ${deedStatus === 'mousha' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="deedStatus"
                  value="mousha"
                  checked={deedStatus === 'mousha'}
                  onChange={(e) => setDeedStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>سند مشاعی، ورثه‌ای یا تفکیک‌نشده</strong>
                  <span>احتمال ادعای سایر شرکا، نبود گواهی عدم افراز یا انحصار وراثت</span>
                </div>
              </label>

              <label className={`risk-radio-item ${deedStatus === 'vekalati' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="deedStatus"
                  value="vekalati"
                  checked={deedStatus === 'vekalati'}
                  onChange={(e) => setDeedStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>معامله به صورت وکالت بلاعزل بدون انتقال سند رسمی</strong>
                  <span>ریسک فوت یا حجر موکل و امکان فروش همزمان ملک توسط مالک اصلی</span>
                </div>
              </label>

              <label className={`risk-radio-item ${deedStatus === 'unknown' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="deedStatus"
                  value="unknown"
                  checked={deedStatus === 'unknown'}
                  onChange={(e) => setDeedStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>قولنامه‌ای عادی یا سند دست‌به‌دست شده فاقد ریشه رسمی</strong>
                  <span>خطر جدی فروش مال به غیر و عدم استماع در دادگاه طبق قانون ۱۴۰۳</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 2: Inquiries */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۲</span>
              <div>
                <h3>استعلامات قانونی قبل از امضا و پرداخت</h3>
                <small>مواردی که شخصاً یا توسط وکیل باید قبل از واریز بیعانه کنترل شوند</small>
              </div>
            </div>

            <div className="risk-checkboxes-grid">
              <label className={`risk-check-card ${inquiries.registryCheck ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={inquiries.registryCheck}
                  onChange={() => toggleInquiry('registryCheck')}
                />
                <div className="check-card-info">
                  <strong>استعلام تصدیق اصالت سند ثبتی</strong>
                  <span>تطبیق شماره شش‌دانگ با سامانه اسناد و املاک</span>
                </div>
              </label>

              <label className={`risk-check-card ${inquiries.mortgageCheck ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={inquiries.mortgageCheck}
                  onChange={() => toggleInquiry('mortgageCheck')}
                />
                <div className="check-card-info">
                  <strong>استعلام عدم بازداشت و رهن بانک</strong>
                  <span>اطمینان از اینکه ملک در وثیقه وام یا توقیف اجرای احکام نیست</span>
                </div>
              </label>

              <label className={`risk-check-card ${inquiries.sayadOrKatebCode ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={inquiries.sayadOrKatebCode}
                  onChange={() => toggleInquiry('sayadOrKatebCode')}
                />
                <div className="check-card-info">
                  <strong>کدرهگیری یکتا (سامانه کاتب یا خودنویس)</strong>
                  <span>جلوگیری از معاملات معارض و فروش همزمان به چند نفر</span>
                </div>
              </label>

              <label className={`risk-check-card ${inquiries.municipalityTaxes ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={inquiries.municipalityTaxes}
                  onChange={() => toggleInquiry('municipalityTaxes')}
                />
                <div className="check-card-info">
                  <strong>مفاصاحساب شهرداری و دارایی</strong>
                  <span>بررسی عدم وجود جریمه کمیسیون ماده ۱۰۰ و عوارض نوسازی</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Waiver of Options */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۳</span>
              <div>
                <h3>بند حساس «اسقاط کافه خیارات» در قرارداد</h3>
                <small>بندی چاپی که ۹۰٪ خریداران بدون آگاهی امضا می‌کنند</small>
              </div>
            </div>

            <div className="risk-radio-group">
              <label className={`risk-radio-item ${khiaratStatus === 'custom-exempt' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="khiaratStatus"
                  value="custom-exempt"
                  checked={khiaratStatus === 'custom-exempt'}
                  onChange={(e) => setKhiaratStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>استثنا شدن خیارات حیاتی (تدلیس، عیب و تخلف از وصف)</strong>
                  <span>درج شده: «به استثنای خیار غبن افحش، خیار تدلیس و خیار عیب» (استاندارد و ایمن)</span>
                </div>
              </label>

              <label className={`risk-radio-item ${khiaratStatus === 'full-waiver' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="khiaratStatus"
                  value="full-waiver"
                  checked={khiaratStatus === 'full-waiver'}
                  onChange={(e) => setKhiaratStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>امضای عبارت مطلق: «اسقاط کافه خیارات ولو خیار غبن فاحش یا افحش»</strong>
                  <span>فوق‌العاده خطرناک! حتی در صورت کلاهبرداری یا نقص ساختاری، حق فسخ بسته می‌شود</span>
                </div>
              </label>

              <label className={`risk-radio-item ${khiaratStatus === 'rescission-clause' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="khiaratStatus"
                  value="rescission-clause"
                  checked={khiaratStatus === 'rescission-clause'}
                  onChange={(e) => setKhiaratStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>درج حق فسخ مشروط با مهلت معین برای خریدار</strong>
                  <span>در صورت عدم انطباق پایان‌کار یا عیب اساسی با نظر کارشناس رسمی</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Delay Penalty */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۴</span>
              <div>
                <h3>ضمانت‌اجرا و وجه التزام خسارت روزانه</h3>
                <small>جریمه تاخیر در تحویل کلید و تنظیم سند در دفترخانه</small>
              </div>
            </div>

            <div className="risk-radio-group">
              <label className={`risk-radio-item ${penaltyStatus === 'both-balanced' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="penaltyStatus"
                  value="both-balanced"
                  checked={penaltyStatus === 'both-balanced'}
                  onChange={(e) => setPenaltyStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>تعیین خسارت روزانه متقابل، معین و بازدارنده</strong>
                  <span>مثلاً روزانه ۵ الی ۱۰ میلیون تومان به ازای هر روز تاخیر در تحویل یا انتقال سند</span>
                </div>
              </label>

              <label className={`risk-radio-item ${penaltyStatus === 'one-sided-low' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="penaltyStatus"
                  value="one-sided-low"
                  checked={penaltyStatus === 'one-sided-low'}
                  onChange={(e) => setPenaltyStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>مبلغ ناچیز یا خسارت یک‌طرفه به نفع فروشنده</strong>
                  <span>عدم تناسب جریمه با تورم مسکن در صورت تاخیر چند ماهه فروشنده</span>
                </div>
              </label>

              <label className={`risk-radio-item ${penaltyStatus === 'none' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="penaltyStatus"
                  value="none"
                  checked={penaltyStatus === 'none'}
                  onChange={(e) => setPenaltyStatus(e.target.value)}
                />
                <div className="radio-text">
                  <strong>هیچ وجه التزامی برای تاخیر فروشنده درج نشده است</strong>
                  <span>ریسک بالا! در صورت تاخیر فروشنده، تنها راه شما دادگاه و دادرسی طولانی خواهد بود</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 5: Appurtenances */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۵</span>
              <div>
                <h3>مشخصات دقیق پارکینگ، انباری و مساحت</h3>
                <small>شروطی که مانع از اختلافات شدید در زمان تحویل آپارتمان می‌شوند</small>
              </div>
            </div>

            <div className="risk-checkboxes-grid">
              <label className={`risk-check-card ${appurtenances.parkingNumber ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={appurtenances.parkingNumber}
                  onChange={() => toggleAppurtenance('parkingNumber')}
                />
                <div className="check-card-info">
                  <strong>شماره دقیق پارکینگ سندی</strong>
                  <span>ذکر شماره قطعه در صورتمجلس تفکیکی و غیرمزاحم بودن</span>
                </div>
              </label>

              <label className={`risk-check-card ${appurtenances.storageNumber ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={appurtenances.storageNumber}
                  onChange={() => toggleAppurtenance('storageNumber')}
                />
                <div className="check-card-info">
                  <strong>شماره و مساحت سندی انباری</strong>
                  <span>قید متراژ و شماره دقیق در طبقه منفی یا پشت‌بام</span>
                </div>
              </label>

              <label className={`risk-check-card ${appurtenances.utilitiesSeparated ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={appurtenances.utilitiesSeparated}
                  onChange={() => toggleAppurtenance('utilitiesSeparated')}
                />
                <div className="check-card-info">
                  <strong>تفکیک کنتورهای برق، گاز و آب</strong>
                  <span>تعیین تکلیف بدهی‌های قبلی مشاعات ساختمان</span>
                </div>
              </label>

              <label className={`risk-check-card ${appurtenances.areaDiscrepancyClause ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={appurtenances.areaDiscrepancyClause}
                  onChange={() => toggleAppurtenance('areaDiscrepancyClause')}
                />
                <div className="check-card-info">
                  <strong>شرط کسری یا اضافه متراژ</strong>
                  <span>تسویه اضافه/کسری مساحت طبق قیمت متری روز معامله</span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 6: Defect & Court Precedent */}
          <div className="risk-section">
            <div className="risk-sec-head">
              <span className="sec-step">۶</span>
              <div>
                <h3>شرط مستحق‌للغیر درآمدن (رای وحدت رویه ۷۳۳ و ۸۱۱)</h3>
                <small>بیمه خریدار در صورت باطل درآمدن معامله به دلیل ادعای اشخاص ثالث</small>
              </div>
            </div>

            <div className="risk-radio-group">
              <label className={`risk-radio-item ${defectClause === 'court-precedent' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="defectClause"
                  value="court-precedent"
                  checked={defectClause === 'court-precedent'}
                  onChange={(e) => setDefectClause(e.target.value)}
                />
                <div className="radio-text">
                  <strong>پرداخت غرامت و ثمن به نرخ روز ملک (آرای ۷۳۳ و ۸۱۱ دیوان عالی)</strong>
                  <span>در صورت ابطال یا فضولی بودن معامله، فروشنده مکلف به جبران ارزش روز ملک است</span>
                </div>
              </label>

              <label className={`risk-radio-item ${defectClause === 'principal-only' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="defectClause"
                  value="principal-only"
                  checked={defectClause === 'principal-only'}
                  onChange={(e) => setDefectClause(e.target.value)}
                />
                <div className="radio-text">
                  <strong>صرفاً استرداد اصل ثمن پرداختی</strong>
                  <span>با گذشت چند سال و تورم شدید، با اصل پول دیگر امکان خرید ملک نخواهید داشت</span>
                </div>
              </label>

              <label className={`risk-radio-item ${defectClause === 'silent' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="defectClause"
                  value="silent"
                  checked={defectClause === 'silent'}
                  onChange={(e) => setDefectClause(e.target.value)}
                />
                <div className="radio-text">
                  <strong>مسکوت گذاشته شده و توافقی نشده است</strong>
                  <span>نیاز به طرح دادخواست‌های پیچیده حقوقی جهت دریافت خسارت تاخیر تادیه</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right / Sticky Evaluation Scorecard */}
        <aside className="risk-scorecard-col">
          <div className="risk-scorecard-sticky">
            <div className="scorecard-header" style={{ backgroundColor: evaluation.levelBg }}>
              <div className="score-meter-wrap">
                <div className="score-circle" style={{ borderColor: evaluation.levelColor }}>
                  <span className="score-num" style={{ color: evaluation.levelColor }}>
                    {evaluation.score}
                  </span>
                  <span className="score-total">از ۱۰۰</span>
                </div>
              </div>

              <div className="score-summary-text">
                <span className="score-badge" style={{ color: evaluation.levelColor }}>
                  {evaluation.level === 'safe' && <ShieldCheck size={18} />}
                  {evaluation.level === 'moderate' && <AlertTriangle size={18} />}
                  {evaluation.level === 'high-risk' && <ShieldAlert size={18} />}
                  <span>{evaluation.levelTitle}</span>
                </span>
                <p className="score-tip">
                  {evaluation.score >= 80
                    ? 'قرارداد بر اساس شروط استاندارد تنظیم شده است. حتماً امضای شهود و احراز هویت را فراموش نکنید.'
                    : evaluation.score >= 55
                    ? 'چند بند ریسک‌دار شناسایی شد که در آینده ممکن است دست شما را در دادگاه ببندد.'
                    : 'قرارداد فاقد حفاظ‌های قانونی ضروری است؛ از پرداخت هرگونه بیعانه تا بازبینی وکیل خودداری فرمایید.'}
                </p>
              </div>
            </div>

            {/* Red Flags List */}
            {evaluation.redFlags.length > 0 && (
              <div className="scorecard-alerts-block">
                <h4 className="alerts-title">
                  <XCircle size={16} className="text-danger" />
                  <span>هشدارهای بحرانی ({evaluation.redFlags.length})</span>
                </h4>
                <ul className="alerts-list">
                  {evaluation.redFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {evaluation.recommendations.length > 0 && (
              <div className="scorecard-recomms-block">
                <h4 className="recomms-title">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>اقدامات اصلاحی قبل از امضا</span>
                </h4>
                <ul className="recomms-list">
                  {evaluation.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="scorecard-actions">
              <button type="button" className="btn btn-outline full-w" onClick={copyReport}>
                <Copy size={16} />
                <span>کپی خلاصه گزارش ارزیابی</span>
              </button>

              <button type="button" className="btn btn-ghost full-w" onClick={printReport}>
                <Printer size={16} />
                <span>چاپ یا ذخیره PDF گزارش</span>
              </button>

              <div className="lawyer-review-cta">
                <div className="lawyer-cta-badge">پیشنهاد تخصصی</div>
                <p>
                  می‌توانید پیش‌نویس مبایعه‌نامه خود را پیش از امضا جهت بازبینی بندبه‌بند و درج شروط حفاظتی برای وکیل ارسال فرمایید.
                </p>
                <Link to="/moshavere" className="btn btn-gold full-w">
                  درخواست بررسی تخصصی قرارداد
                </Link>
                <a
                  href={`tel:${lawyer.phone}`}
                  className="phone-quick-call"
                  aria-label={`تماس با دفتر وکالت ${lawyer.phone}`}
                >
                  <PhoneCall size={14} />
                  <span>تماس با دفتر وکالت:</span>
                  <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
