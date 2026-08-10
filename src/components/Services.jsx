import { services } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './Services.css'

const icons = {
  'general-claims': <path d="M12 3v18M6 6h12M6 6l-3 6a3 3 0 0 0 6 0L6 6ZM18 6l-3 6a3 3 0 0 0 6 0L18 6ZM8 21h8" strokeLinecap="round" strokeLinejoin="round"/>,
  contracts: <><path d="M7 3h8l4 4v14H7V3Z" strokeLinejoin="round"/><path d="M11 11h6M11 15h6M11 7h3" strokeLinecap="round"/></>,
  petitions: <><path d="M5 4h11l3 3v13H5V4Z" strokeLinejoin="round"/><path d="M9 10h7M9 14h7M9 18h4" strokeLinecap="round"/></>,
  consultation: <><path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round"/></>,
  negotiation: <><circle cx="8" cy="9" r="3"/><circle cx="17" cy="9" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 6-5" strokeLinecap="round"/></>,
  defense: <path d="M12 3l8 3.5v5c0 5-3.4 8.4-8 9.5-4.6-1.1-8-4.5-8-9.5v-5L12 3Z" strokeLinejoin="round"/>,
}

function ServiceCard({ service }) {
  const ref = useReveal()
  return (
    <article className="service-card card reveal" ref={ref}>
      <span className="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          {icons[service.id]}
        </svg>
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <a href="#consultation" className="service-link">
        مشاهده جزئیات
        <span aria-hidden="true">‹</span>
      </a>
    </article>
  )
}

export default function Services() {
  const headRef = useReveal()
  return (
    <section id="services">
      <div className="container">
        <div className="reveal" ref={headRef}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">خدمات حقوقی</h2>
          <p className="section-subtitle">
            ارائه خدمات تخصصی حقوقی متناسب با شرایط و نیاز هر پرونده
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard service={s} key={s.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
