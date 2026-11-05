import { useState } from 'react'
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send, BellRing, Lock } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import './NewsletterSubscription.css'

export default function NewsletterSubscription({ variant = 'default', title, subtitle }) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('ملکی و ثبتی')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { showToast } = useToast()

  const topicOptions = [
    { id: 'ملکی و ثبتی', label: 'دعاوی ملکی و ثبتی' },
    { id: 'چک و مطالبات', label: 'چک صیادی و مطالبات' },
    { id: 'قراردادها و شرکت‌ها', label: 'قراردادها و قوانین جدید' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showToast('لطفاً یک نشانی ایمیل معتبر وارد نمایید.', 'error')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      // Persist locally in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('vakilkhoini_subscribers') || '[]')
        const newSub = {
          email,
          fullName: fullName.trim() || 'کاربر محترم',
          topic: selectedTopic,
          date: new Date().toISOString(),
        }
        localStorage.setItem('vakilkhoini_subscribers', JSON.stringify([newSub, ...existing]))
      } catch (err) {
        console.error('LocalStorage error:', err)
      }

      setIsSubmitting(false)
      setIsSubscribed(true)
      showToast('عضویت شما در خبرنامه تحلیلی حقوقی با موفقیت ثبت گردید.', 'success')
    }, 800)
  }

  const handleReset = () => {
    setIsSubscribed(false)
    setEmail('')
    setFullName('')
  }

  return (
    <div className={`newsletter-widget-container ${variant}`}>
      <div className="newsletter-card card">
        <div className="newsletter-head">
          <div className="newsletter-icon-badge">
            <BellRing size={22} />
          </div>
          <div className="newsletter-titles">
            <span className="newsletter-eyebrow">
              <Sparkles size={13} />
              <span>خبرنامه تحلیلی قوانین و آرای قضایی ۱۴۰۵</span>
            </span>
            <h3 className="newsletter-title">
              {title || 'اشتراک در به‌روزرسانی‌ها و تحلیل‌های حقوقی'}
            </h3>
            <p className="newsletter-desc">
              {subtitle || 'دریافت جدیدترین تغییرات قوانین ثبتی، بخشنامه‌های صدور چک، رویه دادگاه‌ها و نکات پیشگیری از دعاوی ملکی هر دو هفته یک‌بار در ایمیل شما.'}
            </p>
          </div>
        </div>

        {isSubscribed ? (
          <div className="newsletter-success-box" role="alert">
            <div className="success-icon-wrap">
              <CheckCircle2 size={32} />
            </div>
            <div className="success-text">
              <strong>عضویت شما با موفقیت فعال شد!</strong>
              <p>
                از این پس جدیدترین تحلیل‌های حقوقی و تغییرات قوانین به ایمیل <span className="user-email">{email}</span> ارسال خواهد شد.
              </p>
            </div>
            <button type="button" onClick={handleReset} className="newsletter-reset-btn">
              ثبت ایمیل جدید
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
            {/* Topic Preferences */}
            <div className="newsletter-topics-row">
              <span className="topics-label">حوزه تحلیلی مورد علاقه:</span>
              <div className="topics-pills">
                {topicOptions.map((top) => (
                  <button
                    key={top.id}
                    type="button"
                    className={`topic-pill ${selectedTopic === top.id ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(top.id)}
                  >
                    {top.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="newsletter-inputs-grid">
              <div className="newsletter-input-group">
                <input
                  type="text"
                  className="newsletter-input"
                  placeholder="نام و نام خانوادگی (اختیاری)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-label="نام و نام خانوادگی"
                />
              </div>

              <div className="newsletter-input-group">
                <div className="input-with-icon">
                  <Mail size={17} className="input-icon" />
                  <input
                    type="email"
                    required
                    className="newsletter-input"
                    placeholder="نشانی ایمیل شما (مثال: name@domain.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="نشانی ایمیل"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gold newsletter-submit-btn"
              >
                {isSubmitting ? (
                  <span>در حال ثبت...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>عضویت در خبرنامه</span>
                  </>
                )}
              </button>
            </div>

            <div className="newsletter-privacy-note">
              <Lock size={12} />
              <span>ایمیل شما نزد دفتر وکالت محفوظ است. عدم ارسال اسپم و امکان لغو عضویت در هر زمان.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
