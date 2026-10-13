import { useEffect, useState, useCallback } from 'react'
import { lawyer, navLinks } from '../data/content.js'
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Scale,
  Calendar,
  Clock,
  MapPin,
  Home,
  User,
  Calculator,
  FileText,
  BookOpen,
  HelpCircle,
  ChevronLeft,
} from 'lucide-react'
import { useRouter } from '../router.jsx'
import './Header.css'

function getNavLinkIcon(href) {
  if (href === '#about') return <User size={18} />
  if (href === '#services') return <Scale size={18} />
  if (href === '/mohasebe') return <Calculator size={18} />
  if (href === '#process') return <FileText size={18} />
  if (href === '#articles' || href === '/maghalat') return <BookOpen size={18} />
  if (href === '#faq') return <HelpCircle size={18} />
  if (href === '#contact') return <MapPin size={18} />
  return <ChevronLeft size={16} />
}

export default function Header() {
  const { pathname, navigate } = useRouter()
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

  // Lock body scroll when mobile menu is open & close on ESC
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleNavClick = useCallback(
    (e, href) => {
      setOpen(false)
      if (href && href.startsWith('/')) {
        e.preventDefault()
        navigate(href)
        return
      }
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1)

        if (pathname !== '/') {
          e.preventDefault()
          navigate(`/${href}`)
          return
        }

        e.preventDefault()
        // Small delay to allow mobile drawer close transition and body scroll unlock
        setTimeout(() => {
          const targetEl = document.getElementById(targetId)
          if (targetEl) {
            const headerOffset = 70
            const elementPosition = targetEl.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
            setActiveSection(targetId)
            window.history.pushState(null, '', href)
          }
        }, 80)
      }
    },
    [navigate, pathname]
  )

  return (
    <>
      {/* Top Notification & Info Bar */}
      <div className="top-banner" role="complementary">
        <div className="container top-banner-inner">
          <div className="top-banner-right">
            <span className="top-badge">
              <MapPin size={12} aria-hidden="true" />
              <span>
                {lawyer.city}، {lawyer.region}
              </span>
            </span>
            <span className="top-divider">•</span>
            <span className="top-bar-text">{lawyer.barAssociation}</span>
          </div>

          <div className="top-banner-left">
            <div className="top-hours">
              <Clock size={12} aria-hidden="true" />
              <span>{lawyer.shortHours}</span>
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
              <span className="phone-number" dir="ltr">
                {lawyer.displayPhone}
              </span>
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
                const isActive = link.href.startsWith('/')
                  ? pathname === link.href
                  : pathname === '/' && activeSection === sectionId
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
              <span className="header-phone-num phone-number" dir="ltr">
                {lawyer.displayPhone}
              </span>
            </a>

            <a
              href="#consultation"
              className="btn btn-gold header-cta-btn"
              onClick={(e) => handleNavClick(e, '#consultation')}
            >
              <Calendar size={15} />
              <span>درخواست مشاوره</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
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
      </header>

      {/* Mobile Slide-in Drawer & Backdrop - Mounted outside sticky header */}
      <div
        className={`mobile-backdrop ${open ? 'visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        id="mobile-drawer"
        className={`mobile-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی ناوبری موبایل"
      >
        <div className="mobile-drawer-head">
          <div
            className="brand"
            onClick={(e) => handleNavClick(e, '#home')}
            style={{ cursor: 'pointer' }}
          >
            <span className="brand-mark" aria-hidden="true">
              <Scale size={18} />
            </span>
            <div className="brand-text">
              <span className="brand-name">{lawyer.name}</span>
              <span className="brand-title">{lawyer.title}</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setOpen(false)}
            aria-label="بستن منوی ناوبری"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <nav className="mobile-nav" aria-label="منوی موبایل">
            <ul>
              <li>
                <a
                  href="#home"
                  className={pathname === '/' && activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, '#home')}
                >
                  <span className="mobile-nav-item-content">
                    <span className="mobile-nav-icon">
                      <Home size={18} />
                    </span>
                    <span className="mobile-nav-label">صفحه نخست</span>
                  </span>
                  <ChevronLeft size={16} className="chevron" />
                </a>
              </li>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = link.href.startsWith('/')
                  ? pathname === link.href
                  : pathname === '/' && activeSection === sectionId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span className="mobile-nav-item-content">
                        <span className="mobile-nav-icon">{getNavLinkIcon(link.href)}</span>
                        <span className="mobile-nav-label">{link.label}</span>
                      </span>
                      <ChevronLeft size={16} className="chevron" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="mobile-drawer-footer">
          <a
            href="#consultation"
            className="btn btn-gold w-full mobile-cta-appointment"
            onClick={(e) => handleNavClick(e, '#consultation')}
          >
            <Calendar size={17} />
            <span>درخواست نوبت مشاوره</span>
          </a>
          <div className="mobile-quick-contacts">
            <a
              href={lawyer.phoneHref}
              className="mobile-contact-pill"
              aria-label={`تماس تلفنی ${lawyer.phone}`}
            >
              <Phone size={14} />
              <span className="phone-number" dir="ltr">
                {lawyer.displayPhone}
              </span>
            </a>
            <a
              href={lawyer.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-contact-pill whatsapp"
              aria-label="پیام در واتساپ"
            >
              <MessageCircle size={14} />
              <span>واتساپ</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
