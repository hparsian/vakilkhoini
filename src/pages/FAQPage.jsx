import { useState } from 'react'
import { faqs, lawyer } from '../data/content.js'
import { Link } from '../router.jsx'
import useSEO, { SITE_URL } from '../hooks/useSEO.js'
import {
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  Search,
  X,
  PhoneCall,
  Calendar,
  Calculator,
  MessageCircleQuestion,
} from 'lucide-react'
import '../components/FAQ.css'
import './ArticlePage.css'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const categories = [
    { id: 'all', label: 'همه پرسش‌ها' },
    { id: 'consulting', label: 'مشاوره و تعیین وقت' },
    { id: 'costs', label: 'حق‌الوکاله و هزینه‌ها' },
    { id: 'process', label: 'روند دادرسی و دادگاه' },
    { id: 'office', label: 'نشانی و ساعات دفتر' },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    if (!matchesCategory) return false

    if (!searchQuery.trim()) return true
    const q = searchQuery.trim().toLowerCase()
    return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
  })

  const canonicalPath = '/faq'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${canonicalPath}#faqpage`,
        name: `پرسش‌های متداول حقوقی و وکالت | دفتر وکالت ${lawyer.name}`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'سوالات متداول', item: `${SITE_URL}${canonicalPath}` },
        ],
      },
    ],
  }

  useSEO({
    title: `سوالات متداول از وکیل حقوقی تهران | حق‌الوکاله و دادرسی`,
    description: `پاسخ وکیل حقوقی در تهران و سعادت‌آباد به پرسش‌های پرتکرار درباره حق‌الوکاله، مدت دادرسی، مشاوره آنلاین و سامانه ثنا.`,
    path: canonicalPath,
    jsonLd,
  })

  return (
    <main id="main" className="article-page" style={{ paddingTop: 40, paddingBottom: 90 }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">صفحه اصلی</Link>
          <ChevronLeft size={14} />
          <span aria-current="page">سوالات متداول حقوقی</span>
        </nav>

        {/* Section Head */}
        <div className="section-head center">
          <div className="eyebrow">
            <MessageCircleQuestion size={14} />
            <span>پاسخ شفاف به ابهامات موکلین</span>
          </div>
          <h1 className="section-title">پرسش‌های متداول موکلین از وکیل حقوقی</h1>
          <p className="section-subtitle">
            پاسخ‌های دقیق و مستند وکیل پایه یک دادگستری به رایج‌ترین سؤالات موکلین پیش از شروع اقدامات قضایی
          </p>
        </div>

        {/* Live Search */}
        <div className="articles-search-box" style={{ marginBottom: 30 }}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="articles-search-input"
              placeholder="جستجو در پرسش‌ها (مثال: حق‌الوکاله، تضمین، خارج از کشور، ساعات...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="جستجو در سوالات متداول"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="پاک کردن جستجو"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="articles-filter-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`article-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordions List */}
        <div className="faq-list" style={{ maxWidth: 880, margin: '0 auto 60px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
              <p>سؤالی متناسب با عبارت جستجوی شما یافت نشد.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
                className="btn btn-outline-dark"
                style={{ marginTop: 14 }}
              >
                نمایش تمام سؤالات
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openItems[index] !== undefined ? openItems[index] : index === 0
              return (
                <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-text">
                      <HelpCircle size={18} className="faq-icon" />
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Need more answers banner */}
        <div className="about-cta-card">
          <div className="cta-icon">
            <HelpCircle size={28} />
          </div>
          <div className="cta-content">
            <h2>پاسخ سؤال حقوقی خود را نیافتید؟</h2>
            <p>
              جهت طرح سؤال یا دریافت مشاوره مستقیم درباره جزئیات پرونده خود، می‌توانید با دفتر وکالت در تماس باشید.
            </p>
          </div>
          <div className="cta-btns">
            <Link to="/moshavere" className="btn btn-gold">
              <Calendar size={16} />
              <span>ثبت درخواست مشاوره</span>
            </Link>
            <Link to="/mohasebe" className="btn btn-outline-light">
              <Calculator size={16} />
              <span>محاسبه آنلاین هزینه‌ها</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
