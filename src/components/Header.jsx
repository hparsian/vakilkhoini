import { useEffect, useState } from 'react'
import { lawyer, navLinks } from '../data/content.js'
import { Phone, MessageCircle, Menu, X, Scale, Calendar, Clock, MapPin } from 'lucide-react'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sectionIds = ['home', ...navLinks.map((l) => l.href.replace('#', '')), 'consultation']
      const scrollPos = window.scrollY + 100

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (e, href) => {
    setOpen(false)
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        const headerOffset = 70
        const elementPosition = targetEl.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        setActiveSection(targetId)
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <>
      {/* Top Notification & Info Bar */}
      <div className="top-banner" role="complementary">
        <div className="container top-banner-inner">
          <div className="top-banner-right">
            <span className="top-badge">
              <MapPin size={12} aria-hidden="true" />
              <span>{lawyer.city}، {lawyer.region}</span>
            </span>
            <span className="top-divider">•</span>
            <span className="top-bar-text">{lawyer.barAssociation}</span>
          </div>

          <div className="top-banner-left">
            <div className="top-hours">
              <Clock size={12} aria-hidden="true" />
              <span>شنبه تا چهارشنبه ۱۶ الی ۲۰ (با وقت قبلی)</span>
            </div>
            <a
              href={lawyer.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="top-link whatsapp-link"
              aria-label="مشاوره در واتساپ"
            >
              <MessageCircle size={13} aria-hidden="true" />
              <span>واتساپ</span>
            </a>
            <a
              href={lawyer.phoneHref}
              className="top-link phone-link"
              aria-label={`تماس مستقیم با ${lawyer.phone}`}
            >
              <Phone size={12} aria-hidden="true" />
              <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo & Identity */}
          <a
            href="#home"
            className="brand"
            aria-label={`${lawyer.name} - صفحه اصلی`}
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <span className="brand-mark" aria-hidden="true">
              <Scale size={20} className="brand-icon" />
            </span>
            <div className="brand-text">
              <span className="brand-name">{lawyer.name}</span>
              <span className="brand-title">{lawyer.title}</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" aria-label="منوی اصلی وب‌سایت">
            <ul>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Header Quick Actions */}
          <div className="header-actions">
            <a
              href={lawyer.phoneHref}
              className="header-phone-pill"
              aria-label={`تماس با شماره ${lawyer.phone}`}
              title="تماس مستقیم با دفتر"
            >
              <Phone size={14} className="pulse-icon" />
              <span className="header-phone-num phone-number" dir="ltr">{lawyer.displayPhone}</span>
            </a>

            <a
              href="#consultation"
              className="btn btn-gold header-cta-btn"
              onClick={(e) => handleNavClick(e, '#consultation')}
            >
              <Calendar size={15} />
              <span>درخواست مشاوره</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`hamburger ${open ? 'is-active' : ''}`}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        <div
          className={`mobile-backdrop ${open ? 'visible' : ''}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />
        <div id="mobile-drawer" className={`mobile-drawer ${open ? 'open' : ''}`}>
          <div className="mobile-drawer-head">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">
                <Scale size={18} />
              </span>
              <div className="brand-text">
                <span className="brand-name">{lawyer.name}</span>
                <span className="brand-title">{lawyer.title}</span>
              </div>
            </div>
            <button className="mobile-close-btn" onClick={() => setOpen(false)} aria-label="بستن منو">
              <X size={20} />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="منوی موبایل">
            <ul>
              <li>
                <a
                  href="#home"
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, '#home')}
                >
                  <span>صفحه نخست</span>
                  <span className="chevron" aria-hidden="true">‹</span>
                </a>
              </li>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span>{link.label}</span>
                      <span className="chevron" aria-hidden="true">‹</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href="#consultation"
              className="btn btn-gold w-full"
              onClick={(e) => handleNavClick(e, '#consultation')}
            >
              <Calendar size={17} />
              <span>درخواست نوبت مشاوره</span>
            </a>
            <div className="mobile-quick-contacts">
              <a href={lawyer.phoneHref} className="mobile-contact-pill">
                <Phone size={14} />
                <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
              </a>
              <a
                href={lawyer.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-contact-pill whatsapp"
              >
                <MessageCircle size={14} />
                <span>واتساپ</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}


