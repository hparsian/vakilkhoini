import { useState } from 'react'
import { services, serviceCategories } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import {
  Building2,
  FileSignature,
  Scale,
  FileText,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  ArrowLeft,
  X,
  Calendar,
  Search,
  Briefcase,
} from 'lucide-react'
import './Services.css'

const iconMap = {
  'property-claims': <Building2 size={24} />,
  'contracts-negotiation': <FileSignature size={24} />,
  'financial-claims': <Briefcase size={24} />,
  'petitions-defense': <FileText size={24} />,
  'legal-consultation': <Scale size={24} />,
  'court-representation': <ShieldCheck size={24} />,
  property: <Building2 size={24} />,
  contracts: <FileSignature size={24} />,
  financial: <Briefcase size={24} />,
  consulting: <Scale size={24} />,
}

export default function Services() {
  const headRef = useReveal()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalService, setActiveModalService] = useState(null)

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      s.category === selectedCategory ||
      (selectedCategory === 'property' && (s.category === 'property' || s.title.includes('ملکی'))) ||
      (selectedCategory === 'contracts' && (s.category === 'contracts' || s.title.includes('قرارداد'))) ||
      (selectedCategory === 'financial' && (s.category === 'financial' || s.title.includes('اسناد') || s.title.includes('چک'))) ||
      (selectedCategory === 'consulting' && (s.category === 'consulting' || s.title.includes('مشاوره') || s.title.includes('لایحه')))

    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      s.title.toLowerCase().includes(query) ||
      (s.description && s.description.toLowerCase().includes(query)) ||
      (s.fullDesc && s.fullDesc.toLowerCase().includes(query)) ||
      (s.subServices && s.subServices.some((sub) => sub.toLowerCase().includes(query)))

    return matchesCategory && matchesSearch
  })

  return (
    <section id="services" className="services-section" aria-label="خدمات تخصصی وکالت">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <div className="eyebrow">حوزه‌های صلاحیت و فعالیت</div>
          <h2 className="section-title">خدمات تخصصی حقوقی و وکالت</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            ارائه خدمات جامع با تکیه بر تسلط قوانین، رویه قضایی محاکم تهران و بررسی دقیق اسناد و مدارک
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="services-toolbar">
          <div className="category-pills" role="tablist">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="services-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="جستجو در خدمات (مثلاً سرقفلی، داوری، لایحه)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="services-search-input"
              aria-label="جستجو در خدمات حقوقی"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                aria-label="پاک کردن جستجو"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((s) => (
            <article className="service-card card" key={s.id}>
              <div className="service-card-head">
                <div className="service-icon-box" aria-hidden="true">
                  {iconMap[s.id] || <Scale size={24} />}
                </div>
                {s.category && <span className="service-category-tag">{s.category}</span>}
              </div>

              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc">{s.description}</p>

              {/* Sub-services Tags */}
              {s.subServices && s.subServices.length > 0 && (
                <div className="subservices-tag-list">
                  {s.subServices.slice(0, 3).map((sub, idx) => (
                    <span className="subservice-tag" key={idx}>
                      {sub}
                    </span>
                  ))}
                  {s.subServices.length > 3 && (
                    <span className="subservice-tag more">
                      +{s.subServices.length - 3} مورد دیگر
                    </span>
                  )}
                </div>
              )}

              <div className="service-card-footer">
                <button
                  type="button"
                  onClick={() => setActiveModalService(s)}
                  className="service-detail-btn"
                >
                  <span>بررسی شرایط و مدارک</span>
                  <ArrowLeft size={15} />
                </button>

                <a
                  href={`#consultation?service=${encodeURIComponent(s.title)}`}
                  className="service-consult-btn"
                  title="درخواست مشاوره برای این خدمت"
                >
                  <Calendar size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="no-services-found">
            <Scale size={40} className="no-found-icon" />
            <p>موردی مطابق با جستجوی «{searchQuery}» یافت نشد.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn btn-outline-dark"
            >
              مشاهده تمامی خدمات
            </button>
          </div>
        )}
      </div>

      {/* Service Detailed Modal */}
      {activeModalService && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveModalService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setActiveModalService(null)}
              aria-label="بستن پنجره"
            >
              <X size={20} />
            </button>

            <div className="modal-service-head">
              <div className="modal-icon-badge">
                {iconMap[activeModalService.id] || <Scale size={28} />}
              </div>
              <div>
                <span className="modal-category">{activeModalService.category || 'خدمت تخصصی'}</span>
                <h3 id="service-modal-title" className="modal-title">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <div className="modal-body-content">
              <p className="modal-desc">{activeModalService.description}</p>
              {(activeModalService.fullDesc || activeModalService.details) && (
                <p className="modal-long-details">{activeModalService.fullDesc || activeModalService.details}</p>
              )}

              {/* Sub-services */}
              {activeModalService.subServices && activeModalService.subServices.length > 0 && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <CheckCircle2 size={17} />
                    <span>انواع پرونده‌ها و دعاوی مرتبط</span>
                  </h4>
                  <ul className="modal-bullet-list">
                    {activeModalService.subServices.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Documents */}
              {(activeModalService.requiredDocs || activeModalService.documentsNeeded) && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <FileSpreadsheet size={17} />
                    <span>مدارک اولیه مورد نیاز جهت بررسی</span>
                  </h4>
                  <ul className="modal-bullet-list docs">
                    {(activeModalService.requiredDocs || activeModalService.documentsNeeded).map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Typical Timeframe */}
              {(activeModalService.timeEstimate || activeModalService.typicalTimeframe) && (
                <div className="modal-timeframe-box">
                  <Clock size={16} />
                  <span>
                    <strong>مدت زمان تقریبی پیگیری:</strong> {activeModalService.timeEstimate || activeModalService.typicalTimeframe}
                  </span>
                </div>
              )}
            </div>

            <div className="modal-footer-actions">
              <a
                href={`#consultation`}
                onClick={() => setActiveModalService(null)}
                className="btn btn-gold"
              >
                <Calendar size={16} />
                <span>درخواست مشاوره برای {activeModalService.title}</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="btn btn-outline-dark"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

