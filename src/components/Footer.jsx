import { lawyer, navLinks } from '../data/content.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">{lawyer.name}</p>
          <p className="footer-title">{lawyer.title}</p>
        </div>

        <nav aria-label="لینک‌های فوتر">
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <a href={lawyer.phoneHref} dir="ltr">{lawyer.phone}</a>
          <span>تهران، سعادت‌آباد</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© تمامی حقوق این وب‌سایت محفوظ است. {year}</p>
        </div>
      </div>
    </footer>
  )
}
