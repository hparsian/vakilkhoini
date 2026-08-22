import { lawyer } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Navigation,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import './Contact.css'

export default function Contact() {
  const ref = useReveal()
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(lawyer.phone)
    setCopied(true)
    showToast('شماره تلفن دفتر در حافظه کپی شد.', 'success')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-head center reveal" ref={ref}>
          <div className="eyebrow">
            <MapPin size={14} />
            <span>راه‌های ارتباطی و موقعیت دفتر</span>
          </div>
          <h2 className="section-title" id="contact-heading">ارتباط مستقیم با دفتر وکالت</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            جهت تعیین وقت قبلی یا انجام مشاوره تخصصی، از طریق راه‌های ارتباطی زیر با ما در تماس باشید
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-card card">
            <div className="contact-card-header">
              <div className="contact-badge">
                <ShieldCheck size={16} />
                <span>پروانه پایه یک کانون وکلای دادگستری استان البرز</span>
              </div>
              <h3 className="contact-name">{lawyer.name}</h3>
              <p className="contact-role">{lawyer.title} | شماره پروانه: ۳۴۸۹۲</p>
            </div>

            <ul className="contact-list">
              {/* Phone */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">شماره تماس مستقیم دفتر</span>
                  <div className="contact-phone-row">
                    <a href={lawyer.phoneHref} className="contact-value phone-val phone-number" dir="ltr">
                      {lawyer.displayPhone}
                    </a>
                    <button
                      type="button"
                      onClick={copyPhoneNumber}
                      className="copy-btn"
                      title="کپی شماره تلفن"
                    >
                      {copied ? <Check size={14} className="copied" /> : <Copy size={14} />}
                      <span>{copied ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                </div>
              </li>

              {/* Location */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">نشانی دفتر</span>
                  <span className="contact-value">
                    تهران، سعادت‌آباد، میدان کاج، بلوار سرو غربی (پذیرش صرفاً با تعیین وقت قبلی)
                  </span>
                </div>
              </li>

              {/* Working Hours */}
              <li className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-label">ساعات کاری و پذیرش</span>
                  <span className="contact-value">
                    {lawyer.hours}
                  </span>
                </div>
              </li>
            </ul>

            <div className="contact-actions-bar">
              <a href={lawyer.phoneHref} className="btn btn-gold flex-1">
                <Phone size={17} />
                <span>تماس تلفنی</span>
              </a>
              <a
                href={lawyer.whatsappHref}
                className="btn btn-outline-dark flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                <span>پیام در واتساپ</span>
              </a>
            </div>
          </div>

          {/* Map / Location Visual Presentation */}
          <div className="contact-map-card card" role="region" aria-label="موقعیت مکانی دفتر">
            <div className="map-artistic-visual">
              <div className="map-grid-overlay" />
              <div className="map-marker-wrap">
                <div className="map-pulse-ring" />
                <div className="map-pin-badge">
                  <MapPin size={22} className="pin-icon" />
                </div>
                <div className="map-label-tag">
                  <strong>دفتر وکالت {lawyer.name}</strong>
                  <span>تهران، سعادت‌آباد</span>
                </div>
              </div>
            </div>

            <div className="map-card-footer">
              <div className="map-footer-info">
                <Sparkles size={16} className="sparkle-gold" />
                <span>دسترسی آسان با پارکینگ اختصاصی و نزدیکی به ایستگاه مترو و میدان کاج</span>
              </div>
              <a
                href="https://nshn.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="map-direction-btn"
              >
                <Navigation size={15} />
                <span>مسیریابی در نقشه</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

