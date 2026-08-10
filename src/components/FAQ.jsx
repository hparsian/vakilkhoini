import { useState } from 'react'
import { faqs, lawyer } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import { HelpCircle, ChevronDown, MessageSquare, PhoneCall } from 'lucide-react'
import './FAQ.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [activeFaqCat, setActiveFaqCat] = useState('all')
  const ref = useReveal()

  const categories = [
    { id: 'all', label: 'همه پرسش‌ها' },
    { id: 'وکالت', label: 'فرآیند وکالت و قرارداد' },
    { id: 'مالی', label: 'حق‌الوکاله و هزینه‌ها' },
    { id: 'دعاوی', label: 'دعاوی ملکی و تجاری' },
  ]

  const filteredFaqs = faqs.filter((item, idx) => {
    if (activeFaqCat === 'all') return true
    if (activeFaqCat === 'وکالت') return idx === 0 || idx === 2 || item.q.includes('وکالت') || item.q.includes('قرارداد')
    if (activeFaqCat === 'مالی') return idx === 1 || item.q.includes('حق‌الوکاله') || item.q.includes('هزینه')
    if (activeFaqCat === 'دعاوی') return idx >= 3 || item.q.includes('ملکی') || item.q.includes('جلسات')
    return true
  })

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-head center reveal" ref={ref}>
          <div className="eyebrow">
            <HelpCircle size={14} />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="section-title" id="faq-title">سوالات متداول موکلین</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            پاسخ به سوالات پرتکرار پیرامون حق‌الوکاله، نحوه همکاری، مدت زمان رسیدگی و جلسات دادگاه
          </p>
        </div>

        {/* Categories */}
        <div className="faq-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-cat-btn ${activeFaqCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFaqCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="faq-layout">
          {/* FAQ Accordion List */}
          <div className="faq-list">
            {filteredFaqs.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `faq-panel-${i}`
              const buttonId = `faq-button-${i}`

              return (
                <div key={item.q} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <h3>
                    <button
                      id={buttonId}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-chevron" aria-hidden="true">
                        <ChevronDown size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-answer-pane"
                    hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Help Card */}
          <aside className="faq-aside-card">
            <div className="aside-icon-box">
              <MessageSquare size={28} />
            </div>
            <h3>سوال دیگری دارید؟</h3>
            <p>
              اگر شرایط پرونده شما خاص است یا پرسشی دارید که در این بخش مطرح نشده، می‌توانید مستقیماً با دفتر تماس بگیرید.
            </p>
            <a href={lawyer.phoneHref} className="btn btn-gold aside-call-btn" aria-label={`تماس با دفتر ${lawyer.phone}`}>
              <PhoneCall size={16} />
              <span>تماس با دفتر:</span>
              <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
            </a>
            <a href="#consultation" className="btn btn-outline-dark aside-form-btn">
              ثبت پیام و درخواست تماس
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

