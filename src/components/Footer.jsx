import { lawyer, navLinks } from '../data/content.js'
import { ShieldCheck, Phone, MapPin, Scale, ChevronLeft } from 'lucide-react'
import { Link, useRouter } from '../router.jsx'
import './Footer.css'

export default function Footer() {
  const currentYear = 1404 // Persian calendar year / Solar Hijri or universal
  const { pathname, navigate } = useRouter()

  const handleHashClick = (e, href) => {
    if (pathname !== '/') {
      e.preventDefault()
      navigate(`/${href}`)
    }
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand & Credentials */}
          <div className="footer-col brand-col">
            <div className="footer-logo-row">
              <div className="footer-scale-icon">
                <Scale size={24} />
              </div>
              <div>
                <h3 className="footer-lawyer-name">{lawyer.name}</h3>
                <p className="footer-lawyer-title">{lawyer.title}</p>
              </div>
            </div>

            <p className="footer-bio-short">
              وکیل پایه یک دادگستری با سال‌ها تجربه موفق در حل‌وفصل دعاوی ملکی، تنظیم قراردادهای بازرگانی و داوری حقوقی در تهران و مراجع قضایی کشور.
            </p>

            <div className="footer-license-badge">
              <ShieldCheck size={16} />
              <span>پروانه وکالت معتبر از کانون وکلای دادگستری استان البرز</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-col links-col">
            <h4 className="footer-col-heading">دسترسی سریع</h4>
            <ul className="footer-nav-list">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <li key={link.href}>
                    <Link to={link.href}>
                      <ChevronLeft size={14} className="nav-chevron" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a href={link.href} onClick={(e) => handleHashClick(e, link.href)}>
                      <ChevronLeft size={14} className="nav-chevron" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                )
              )}
              <li>
                <a href="#consultation" onClick={(e) => handleHashClick(e, '#consultation')}>
                  <ChevronLeft size={14} className="nav-chevron" />
                  <span>رزرو وقت مشاوره</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-heading">ارتباط با دفتر سعادت‌آباد</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={17} className="f-contact-icon" />
                <div>
                  <span className="f-contact-label">شماره تماس:</span>
                  <a href={lawyer.phoneHref} dir="ltr" className="f-phone-link phone-number">
                    {lawyer.displayPhone}
                  </a>
                </div>
              </li>
              <li>
                <MapPin size={17} className="f-contact-icon" />
                <div>
                  <span className="f-contact-label">موقعیت دفتر:</span>
                  <span>تهران، سعادت‌آباد، میدان کاج</span>
                </div>
              </li>
            </ul>

            <a
              href="#consultation"
              onClick={(e) => handleHashClick(e, '#consultation')}
              className="footer-cta-btn btn btn-gold"
            >
              درخواست مشاوره حضوری یا تلفنی
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            <strong>سلب مسئولیت قانونی:</strong> کلیه مطالب و مقالات منتشرشده در این وب‌سایت صرفاً جنبه آموزشی و اطلاع‌رسانی عمومی داشته و به منزله مشاوره حقوقی رسمی برای پرونده خاص شما محسوب نمی‌شود. پیش از هر اقدام قضایی یا انعقاد قرارداد، مشاوره با وکیل ضروری است.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© کلیه حقوق مادی و معنوی این وب‌سایت برای دفتر وکالت {lawyer.name} محفوظ است.</p>
          <span className="footer-designed">طراحی حرفه‌ای و استاندارد حقوقی</span>
        </div>
      </div>
    </footer>
  )
}

