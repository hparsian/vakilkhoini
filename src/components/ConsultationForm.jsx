import { useState } from 'react'
import './ConsultationForm.css'

const initialState = {
  fullName: '',
  phone: '',
  subject: '',
  details: '',
  contactMethod: 'phone',
}

// TODO(backend): این تابع فعلاً یک Mock Handler است.
// برای اتصال به بک‌اند واقعی، این تابع را با یک فراخوانی API واقعی
// (مثلاً fetch به یک endpoint امن) جایگزین کنید. اطلاعات فرم را در
// LocalStorage یا هر فضای ذخیره‌سازی سمت کلاینت نگه ندارید، چون
// حاوی اطلاعات شخصی حساس موکل است.
async function mockSubmitConsultation(data) {
  await new Promise((resolve) => setTimeout(resolve, 700))
  console.info('درخواست مشاوره (Mock):', data)
  return { ok: true }
}

export default function ConsultationForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.phone) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      const res = await mockSubmitConsultation(form)
      if (res.ok) {
        setStatus('success')
        setForm(initialState)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="consultation" className="consultation">
      <div className="container consultation-inner">
        <div className="consultation-intro">
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">درخواست مشاوره حقوقی</h2>
          <p className="section-subtitle">
            اطلاعات خود را وارد کنید تا در اسرع وقت با شما تماس گرفته شود. تمام اطلاعات شما
            محرمانه باقی می‌ماند.
          </p>
        </div>

        <form className="consultation-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="fullName">نام و نام خانوادگی</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">شماره تماس</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="subject">موضوع پرونده</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="details">توضیحات کوتاه</label>
            <textarea
              id="details"
              name="details"
              rows="4"
              value={form.details}
              onChange={handleChange}
            />
          </div>

          <fieldset className="form-row">
            <legend>روش تماس ترجیحی</legend>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={form.contactMethod === 'phone'}
                  onChange={handleChange}
                />
                تماس تلفنی
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={form.contactMethod === 'whatsapp'}
                  onChange={handleChange}
                />
                واتساپ
              </label>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-gold submit-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'در حال ارسال...' : 'ارسال درخواست مشاوره'}
          </button>

          <div role="status" aria-live="polite">
            {status === 'success' && (
              <p className="form-message success">درخواست شما با موفقیت ثبت شد. به‌زودی با شما تماس گرفته می‌شود.</p>
            )}
            {status === 'error' && (
              <p className="form-message error">لطفاً نام و شماره تماس خود را به‌درستی وارد کنید.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
