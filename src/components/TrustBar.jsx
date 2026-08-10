import { trustItems } from '../data/content.js'
import './TrustBar.css'

const icons = [
  // scales
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v18M6 6h12M6 6l-3 6a3 3 0 0 0 6 0L6 6ZM18 6l-3 6a3 3 0 0 0 6 0L18 6ZM8 21h8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // magnifier / precision
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-4.5-4.5" strokeLinecap="round"/></svg>,
  // shield / confidentiality
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l8 3.5v5c0 5-3.4 8.4-8 9.5-4.6-1.1-8-4.5-8-9.5v-5L12 3Z" strokeLinejoin="round"/></svg>,
  // conversation / consultation
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round"/></svg>,
]

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="نقاط قوت همکاری">
      <div className="container trust-inner">
        {trustItems.map((item, i) => (
          <div className="trust-item" key={item.label}>
            <span className="trust-icon" aria-hidden="true">{icons[i]}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
