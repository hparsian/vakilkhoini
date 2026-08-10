import { useEffect, useState } from 'react'
import { lawyer, navLinks } from '../data/content.js'
import { Phone, MessageCircle, Menu, X, Scale, Calendar, Clock } from 'lucide-react'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      const scrollPos = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
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
  }

  return (
    <>
      <div className="top-banner" role="complementary">
        <div className="container top-banner-inner">
          <div className="top-banner-item">
            <Clock size={13} aria-hidden="true" />
            <span>ساعات کاری: شنبه تا چهارشنبه ۱۶ الی ۲۰ (با وقت قبلی)</span>
          </div>
          <div className="top-banner-item location-item">
            <span>تهران، سعادت‌آباد • عضو کانون وکلای دادگستری مرکز</span>
          </div>
          <div className="top-banner-actions">
            <a href={lawyer.whatsappHref} target="_blank" rel="noopener noreferrer" className="top-link whatsapp-link" aria-label="پیام در واتساپ">
              <MessageCircle size={13} aria-hidden="true" />
              <span>پشتیبانی واتساپ</span>
            </a>
            <a href={lawyer.phoneHref} className="top-link phone-link" aria-label="تماس مستقیم">
              <Phone size={13} aria-hidden="true" />
              <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#home" className="brand" aria-label="پرستو خوئینی - صفحه اصلی">
            <span className="brand-mark" aria-hidden="true">
              <Scale size={24} className="brand-icon" />
            </span>
            <span className="brand-text">
              <span className="brand-name">{lawyer.name}</span>
              <span className="brand-title">{lawyer.title}</span>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="منوی اصلی">
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

          <div className="header-actions">
            <a href={lawyer.phoneHref} className="header-call-btn" aria-label={`تماس با شماره ${lawyer.phone}`}>
              <Phone size={16} className="pulse-icon" />
              <div className="header-call-text">
                <span className="call-label">مشاوره تلفنی</span>
                <span className="call-number phone-number" dir="ltr">{lawyer.displayPhone}</span>
              </div>
            </a>

            <a href="#consultation" className="btn btn-gold header-cta">
              <Calendar size={16} />
              <span>درخواست مشاوره</span>
            </a>

            <button
              className={`hamburger ${open ? 'is-active' : ''}`}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
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
                <Scale size={20} />
              </span>
              <div className="brand-text">
                <span className="brand-name">{lawyer.name}</span>
                <span className="brand-title">{lawyer.title}</span>
              </div>
            </div>
            <button className="mobile-close-btn" onClick={() => setOpen(false)} aria-label="بستن منو">
              <X size={22} />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="منوی موبایل">
            <ul>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={() => setOpen(false)}
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
            <a href="#consultation" className="btn btn-gold w-full" onClick={() => setOpen(false)}>
              <Calendar size={18} />
              <span>درخواست نوبت مشاوره</span>
            </a>
            <div className="mobile-quick-contacts">
              <a href={lawyer.phoneHref} className="mobile-contact-pill">
                <Phone size={15} />
                <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
              </a>
              <a href={lawyer.whatsappHref} target="_blank" rel="noopener noreferrer" className="mobile-contact-pill whatsapp">
                <MessageCircle size={15} />
                <span>واتساپ</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

