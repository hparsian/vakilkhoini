import { lawyer } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './Contact.css'

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <div className="contact-info reveal" ref={ref}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">ارتباط با دفتر</h2>

          <p className="contact-name">{lawyer.name}</p>
          <p className="contact-role">{lawyer.title}</p>

          <ul className="contact-details">
            <li>
              <span className="contact-label">شماره تماس</span>
              <a href={lawyer.phoneHref} dir="ltr">{lawyer.phone}</a>
            </li>
            <li>
              <span className="contact-label">موقعیت</span>
              <span>تهران، سعادت‌آباد</span>
            </li>
            <li>
              <span className="contact-label">آدرس دفتر</span>
              <span className="contact-placeholder">آدرس دقیق دفتر پس از تأیید نهایی درج خواهد شد.</span>
            </li>
          </ul>

          <div className="contact-actions">
            <a href={lawyer.phoneHref} className="btn btn-gold">تماس تلفنی</a>
            <a href={lawyer.whatsappHref} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">واتساپ</a>
            <a href="#consultation" className="btn btn-outline-dark">درخواست مشاوره</a>
          </div>
        </div>

        <div className="contact-map" role="img" aria-label="نقشه موقعیت تقریبی دفتر در سعادت‌آباد، تهران">
          <div className="map-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" strokeLinejoin="round"/>
              <circle cx="12" cy="9.5" r="2.5"/>
            </svg>
            <span>نقشه دفتر پس از تأیید آدرس نهایی نمایش داده می‌شود</span>
          </div>
        </div>
      </div>
    </section>
  )
}
