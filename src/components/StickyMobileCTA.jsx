import { lawyer } from '../data/content.js'
import './StickyMobileCTA.css'

export default function StickyMobileCTA() {
  return (
    <div className="sticky-cta" role="navigation" aria-label="دسترسی سریع">
      <a href={lawyer.phoneHref} className="sticky-cta-call" aria-label="تماس تلفنی">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 5a2 2 0 0 1 1-2Z" strokeLinejoin="round"/>
        </svg>
        تماس
      </a>
      <a href="#consultation" className="sticky-cta-main">درخواست مشاوره</a>
    </div>
  )
}
