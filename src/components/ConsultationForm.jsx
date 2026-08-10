import { useState } from 'react'
import { lawyer, services } from '../data/content.js'
import { ShieldCheck, PhoneCall, Calendar, Clock, CheckCircle2, Send, Lock } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import './ConsultationForm.css'

const initialState = {
  fullName: '',
  phone: '',
  subject: 'دعاوی ملکی و ثبتی',
  consultType: 'حضوری',
  preferredTime: 'عصر (۱۶ الی ۲۰)',
  details: '',
  contactMethod: 'phone',
  privacyAgreed: true,
}

// Mock submission handler for client-side demo with realistic feedback
async function submitConsultation(data) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  console.info('Consultation Request Submitted:', data)
  return { ok: true }
}

export default function ConsultationForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const { showToast } = useToast()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      showToast('لطفاً نام و نام خانوادگی خود را کامل وارد کنید.', 'error')
      setStatus('error')
      return
    }

    const cleanPhone = form.phone.trim()
    if (!cleanPhone || cleanPhone.length < 10) {
      showToast('لطفاً یک شماره تماس معتبر وارد فرمایید.', 'error')
      setStatus('error')
      return
    }

    if (!form.privacyAgreed) {
      showToast('لطفاً شرایط حفظ محرمانگی را تأیید فرمایید.', 'error')
      return
    }

    setStatus('submitting')

    try {
      const res = await submitConsultation(form)
      if (res.ok) {
        setStatus('success')
        showToast('درخواست مشاوره شما با موفقیت ثبت شد. به‌زودی با شما تماس خواهیم گرفت.', 'success')
        setForm(initialState)
      } else {
        setStatus('error')
        showToast('خطا در ارسال فرم. لطفاً مجدداً تلاش کنید یا تماس بگیرید.', 'error')
      }
    } catch {
      setStatus('error')
      showToast('خطا در برقراری ارتباط با سرور. لطفاً تلفنی تماس بگیرید.', 'error')
    }
  }

  return (
    <section id="consultation" className="consultation-section" aria-label="درخواست وقت مشاوره حقوقی">
      <div className="container">
        <div className="consultation-grid">
          {/* Side Info Column */}
          <div className="consultation-side-info">
            <div className="eyebrow light">
              <ShieldCheck size={14} />
              <span>پذیرش پرونده و مشاوره</span>
            </div>

            <h2 className="consultation-main-title">درخواست نوبت مشاوره حقوقی</h2>

            <div className="seal-divider">
              <span className="line left-line light" />
              <span className="diamond gold" />
              <span className="line light" />
            </div>

            <p className="consultation-lead-text">
              جهت ارزیابی اولیه پرونده و رزرو وقت مشاوره تخصصی حضوری در سعادت‌آباد یا مشاوره تلفنی، لطفاً فرم مقابل را تکمیل نمایید.
            </p>

            <div className="consultation-features-list">
              <div className="c-feature-item">
                <Lock size={20} className="c-feature-icon" />
                <div>
                  <strong>تعهد مطلق به محرمانگی:</strong>
                  <p>تمام اطلاعات و مدارک شما نزد وکیل کاملاً محرمانه باقی می‌ماند.</p>
                </div>
              </div>

              <div className="c-feature-item">
                <Calendar size={20} className="c-feature-icon" />
                <div>
                  <strong>بررسی مدارک پیش از جلسه:</strong>
                  <p>اسناد شما پیش از شروع جلسه توسط وکیل مطالعه و سنجیده می‌شود.</p>
                </div>
              </div>

              <div className="c-feature-item">
                <Clock size={20} className="c-feature-icon" />
                <div>
                  <strong>ساعات پاسخگویی دفتر:</strong>
                  <p>{lawyer.hours}</p>
                </div>
              </div>
            </div>

            <div className="consultation-direct-phone">
              <span>نیاز به راهنمایی فوری دارید؟</span>
              <a href={lawyer.phoneHref} className="consult-phone-link" aria-label={`تماس مستقیم با شماره ${lawyer.phone}`}>
                <PhoneCall size={18} />
                <span className="consult-phone-val phone-number" dir="ltr">{lawyer.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="consultation-form-wrapper">
            <form className="consultation-form card" onSubmit={handleSubmit} noValidate>
              <div className="form-header-bar">
                <h3>فرم اطلاعات موکل</h3>
                <span className="required-hint">* فیلدهای الزامی</span>
              </div>

              <div className="form-fields-grid">
                {/* Full Name */}
                <div className="form-field">
                  <label htmlFor="fullName">
                    نام و نام خانوادگی <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="مثال: سهراب رحیمی"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="form-field">
                  <label htmlFor="phone">
                    شماره تلفن همراه <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="0912..."
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-fields-grid">
                {/* Subject Selector */}
                <div className="form-field">
                  <label htmlFor="subject">موضوع اصلی پرونده</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="دعاوی ملکی و ثبتی">دعاوی ملکی و ثبتی (خلع ید، الزام به سند، سرقفلی)</option>
                    <option value="قراردادها و امور شرکت‌ها">تنظیم و بازبینی قراردادها و امور شرکتی</option>
                    <option value="مطالبه وجه و اسناد تجاری">مطالبه وجه چک، سفته، مطالبات مالی</option>
                    <option value="تنظیم دادخواست و لایحه">تنظیم لوایح دفاعیه و دادخواست</option>
                    <option value="مشاوره عمومی حقوقی">مشاوره عمومی و بررسی اسناد</option>
                    <option value="سایر امور حقوقی">سایر امور حقوقی</option>
                  </select>
                </div>

                {/* Consultation Type */}
                <div className="form-field">
                  <label htmlFor="consultType">نوع مشاوره مورد نظر</label>
                  <select
                    id="consultType"
                    name="consultType"
                    value={form.consultType}
                    onChange={handleChange}
                  >
                    <option value="حضوری">مشاوره حضوری (دفتر سعادت‌آباد)</option>
                    <option value="تلفنی">مشاوره تلفنی تخصصی</option>
                    <option value="بررسی مدارک">ارسال و بررسی اسناد و قراردادها</option>
                  </select>
                </div>
              </div>

              {/* Time Preference */}
              <div className="form-field">
                <label>زمان ترجیحی برای تماس یا جلسه</label>
                <div className="time-radio-pills">
                  {['صبح (۱۰ الی ۱۴)', 'عصر (۱۶ الی ۲۰)'].map((t) => (
                    <label
                      key={t}
                      className={`time-pill-label ${form.preferredTime === t ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="preferredTime"
                        value={t}
                        checked={form.preferredTime === t}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Case Details */}
              <div className="form-field">
                <label htmlFor="details">شرح مختصر موضوع و سوالات کلیدی</label>
                <textarea
                  id="details"
                  name="details"
                  rows="4"
                  placeholder="خلاصه‌ای از موضوع، اقدامات قبلی یا تاریخ قرارداد را بنویسید..."
                  value={form.details}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Method */}
              <div className="form-field">
                <label className="sub-label">روش ترجیحی ارتباط</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={form.contactMethod === 'phone'}
                      onChange={handleChange}
                    />
                    <span>تماس تلفنی مستقیم</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={form.contactMethod === 'whatsapp'}
                      onChange={handleChange}
                    />
                    <span>پیام‌رسان واتساپ</span>
                  </label>
                </div>
              </div>

              {/* Privacy Checkbox */}
              <div className="privacy-row">
                <label className="privacy-checkbox-label">
                  <input
                    type="checkbox"
                    name="privacyAgreed"
                    checked={form.privacyAgreed}
                    onChange={handleChange}
                  />
                  <span>
                    مطمئن هستم که کلیه اطلاعات وارد شده صرفاً جهت بررسی حقوقی و تماس وکیل استفاده خواهد شد.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-gold submit-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="spinner-icon" />
                    <span>در حال پردازش و ثبت درخواست...</span>
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    <span>ارسال درخواست و رزرو نوبت مشاوره</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-banner success" role="alert">
                  <CheckCircle2 size={20} />
                  <span>درخواست شما با موفقیت ثبت گردید. همکاران دفتر جهت نهایی‌سازی وقت با شما تماس خواهند گرفت.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

