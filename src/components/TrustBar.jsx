import { trustItems } from '../data/content.js'
import { Scale, Search, ShieldCheck, MessageSquareCheck } from 'lucide-react'
import './TrustBar.css'

const icons = [
  <Scale size={20} className="trust-lucide-icon" />,
  <Search size={20} className="trust-lucide-icon" />,
  <ShieldCheck size={20} className="trust-lucide-icon" />,
  <MessageSquareCheck size={20} className="trust-lucide-icon" />,
]

export default function TrustBar() {
  return (
    <div className="trust-bar-section" aria-label="اصول اخلاقی و حرفه‌ای">
      <div className="container">
        <div className="trust-grid">
          {trustItems.map((item, i) => (
            <div className="trust-card" key={item.title || item.label || i}>
              <div className="trust-icon-box" aria-hidden="true">
                {icons[i % icons.length]}
              </div>
              <div className="trust-text-box">
                <span className="trust-label">{item.title || item.label}</span>
                <span className="trust-hint">{item.desc || item.hint || 'تعهد مطلق به موازین قانونی و منافع موکل'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

