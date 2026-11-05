import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { testimonials } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import {
  Star,
  Quote,
  ShieldCheck,
  MapPin,
  Gavel,
  ChevronRight,
  ChevronLeft,
  BadgeCheck,
  Building2,
  Receipt,
  FileSignature,
  Users,
  Award,
} from 'lucide-react'
import './Testimonials.css'

function Stars({ count = 5 }) {
  return (
    <div className="tm-stars" aria-label={`امتیاز ${count} از ۵`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={15} className="tm-star" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const headRef = useReveal()
  const swiperRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'همه نظرات و پرونده‌ها' },
    { id: 'property', label: 'دعاوی ملکی و ثبتی' },
    { id: 'cheque', label: 'وصول چک و مطالبات' },
    { id: 'contracts', label: 'قراردادها و داوری' },
    { id: 'inheritance', label: 'انحصار وراثت و ارث' },
  ]

  const filteredTestimonials =
    activeCategory === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory)

  return (
    <section className="home-section tm-section" aria-labelledby="tm-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-head center reveal" ref={headRef}>
          <div className="eyebrow">
            <ShieldCheck size={14} />
            <span>رضایت موکلین و نمونه پرونده‌های موفق</span>
          </div>
          <h2 className="section-title" id="tm-heading">
            اعتماد موکلین؛ بزرگ‌ترین اعتبار دفتر وکالت
          </h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            نظرات واقعی موکلین و خلاصه‌ای از پرونده‌های موفق قضایی؛ با حفظ ۱۰۰٪ محرمانگی اطلاعات و امانت‌داری حرفه‌ای
          </p>

          {/* Social Proof Trust Badges */}
          <div className="tm-trust-stats-row">
            <div className="tm-trust-stat">
              <Award size={16} />
              <span>۹۸٪ اعلام رضایت موکلین</span>
            </div>
            <div className="tm-trust-stat">
              <BadgeCheck size={16} />
              <span>قرارداد رسمی ثنا قوه قضاییه</span>
            </div>
            <div className="tm-trust-stat">
              <ShieldCheck size={16} />
              <span>پروانه ۳۴۸۹۲ کانون وکلا</span>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="tm-filter-bar" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`tm-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Carousel Container with Custom Arrows */}
        <div className="tm-carousel-wrapper">
          <button
            type="button"
            className="tm-nav-btn tm-prev-btn"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="اسلاید قبلی"
          >
            <ChevronRight size={20} />
          </button>

          <Swiper
            dir="rtl"
            modules={[Autoplay, Pagination, Navigation, A11y]}
            className="tm-swiper"
            spaceBetween={22}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={filteredTestimonials.length > 3}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            a11y={{ enabled: true }}
            grabCursor
          >
            {filteredTestimonials.map((item) => (
              <SwiperSlide key={item.id} className="tm-slide">
                <article className="tm-card">
                  <div className="tm-card-top">
                    <span className="tm-badge tm-badge-category">
                      <Gavel size={13} />
                      <span>{item.categoryLabel || 'پرونده موفق'}</span>
                    </span>
                    <Stars count={item.rating || 5} />
                  </div>

                  <h3 className="tm-title">{item.title}</h3>

                  <blockquote className="tm-quote">
                    <Quote className="tm-quote-mark" size={20} aria-hidden="true" />
                    <p>{item.quote || item.summary}</p>
                  </blockquote>

                  {item.outcome && (
                    <div className="tm-outcome-tag">
                      <BadgeCheck size={14} className="outcome-icon" />
                      <span>{item.outcome}</span>
                    </div>
                  )}

                  <footer className="tm-footer">
                    <div className="tm-client-info">
                      <span className="tm-client-name">{item.client}</span>
                      {item.location && (
                        <span className="tm-location">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                    {item.date && <span className="tm-date">{item.date}</span>}
                  </footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="tm-nav-btn tm-next-btn"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <p className="tm-disclaimer">
          جهت حفظ کامل حریم خصوصی موکلین و رعایت منشور اخلاقی وکالت، نام و مشخصات شناسنامه‌ای موکلین محرمانه مانده و صرفاً خلاصه موضوع و نتیجه رای قطعی منتشر شده است.
        </p>
      </div>
    </section>
  )
}
