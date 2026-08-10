import { lawyer } from '../data/content.js'
import heroPortrait from '../assets/hero-portrait.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">{lawyer.field.split('،')[0]} | {lawyer.city}</p>
          <h1 className="hero-name">{lawyer.name}</h1>
          <p className="hero-role">{lawyer.title}</p>
          <p className="hero-text">
            ارائه خدمات حقوقی تخصصی با رویکردی اخلاق‌مدارانه، دقیق و مسئولانه
          </p>
          <div className="hero-actions">
            <a href="#consultation" className="btn btn-gold">درخواست مشاوره</a>
            <a href={lawyer.phoneHref} className="btn btn-outline">
              تماس مستقیم
              <span dir="ltr">{lawyer.phone}</span>
            </a>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-frame">
            <img
              src={heroPortrait}
              alt={`${lawyer.name}، ${lawyer.title}`}
              width="520"
              height="620"
            />
          </div>
          <div className="hero-frame-mark" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
