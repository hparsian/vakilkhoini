import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import { Star, Quote, ShieldCheck, MapPin, Gavel } from 'lucide-react'
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

  return (
    <section className="home-section tm-section" aria-labelledby="tm-heading">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <div className="eyebrow">
            <ShieldCheck size={14} />
            <span>رضایت موکلین و نمونه پرونده‌های موفق</span>
          </div>
          <h2 className="section-title" id="tm-heading">
            اعتماد موکلین، اعتبار یک وکیل
          </h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            خلاصه‌ای از پرونده‌های موفق و تجربه همکاری موکلین؛ با رعایت کامل امانت‌داری و بدون افشا هویت اشخاص
          </p>
        </div>

        <Swiper
          dir="rtl"
          modules={[Autoplay, Pagination, A11y]}
          className="tm-swiper"
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={testimonials.length > 3}
          autoplay={{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          a11y={{ enabled: true }}
          grabCursor
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="tm-slide">
              <article className="tm-card">
                <div className="tm-card-top">
                  {item.type === 'case' ? (
                    <span className="tm-badge tm-badge-case">
                      <Gavel size={13} />
                      <span>نمونه پرونده موفق</span>
                    </span>
                  ) : (
                    <span className="tm-badge tm-badge-quote">
                      <Quote size={13} />
                      <span>تجربه موکل</span>
                    </span>
                  )}
                  <Stars count={item.rating} />
                </div>

                {item.type === 'case' ? (
                  <>
                    <h3 className="tm-title">{item.title}</h3>
                    <p className="tm-summary">{item.summary}</p>
                  </>
                ) : (
                  <blockquote className="tm-quote">
                    <Quote className="tm-quote-mark" size={22} aria-hidden="true" />
                    <p>{item.quote}</p>
                  </blockquote>
                )}

                <footer className="tm-footer">
                  <span className="tm-client">{item.client}</span>
                  {item.location && (
                    <span className="tm-location">
                      <MapPin size={13} />
                      <span>{item.location}</span>
                    </span>
                  )}
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="tm-disclaimer">
          جهت حفظ حریم خصوصی و رعایت مقررات حرفه‌ای وکالت، نام و مشخصات موکلین درج نشده و صرفاً نوع دعوا و نتیجه کلی با کسب اجازه از ایشان منتشر شده است.
        </p>
      </div>
    </section>
  )
}
