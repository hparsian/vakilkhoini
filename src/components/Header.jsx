import { useEffect, useState } from 'react'
import { lawyer, navLinks } from '../data/content.js'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="بازگشت به صفحه اصلی">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="34" height="34">
              <line x1="32" y1="10" x2="32" y2="48" stroke="#C9A24A" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="14" y1="18" x2="50" y2="18" stroke="#C9A24A" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 18 L7 32 A7 7 0 0 0 21 32 Z" fill="none" stroke="#C9A24A" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M50 18 L43 32 A7 7 0 0 0 57 32 Z" fill="none" stroke="#C9A24A" strokeWidth="2.5" strokeLinejoin="round"/>
              <line x1="22" y1="52" x2="42" y2="52" stroke="#C9A24A" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">{lawyer.name}</span>
            <span className="brand-title">{lawyer.title}</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="منوی اصلی">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#consultation" className="btn btn-gold header-cta">درخواست مشاوره</a>
          <button
            className="hamburger"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`}>
        <nav aria-label="منوی موبایل">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#consultation" className="btn btn-gold" onClick={() => setOpen(false)}>
                درخواست مشاوره
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
