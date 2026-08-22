import { lawyer, whyChooseMe } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import {
  ShieldCheck,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
} from 'lucide-react'
import './WhyChooseMe.css'

const featureIcons = [
  <Scale size={24} className="feature-icon" />,
  <ShieldCheck size={24} className="feature-icon" />,
  <Clock size={24} className="feature-icon" />,
  <Briefcase size={24} className="feature-icon" />,
  <Award size={24} className="feature-icon" />,
  <Users size={24} className="feature-icon" />,
]

export default function WhyChooseMe() {
  const ref = useReveal()

  return (
    <section id="why" className="why-section" aria-label="مزایای همکاری">
      <div className="container">
        <div className="section-head center reveal" ref={ref}>
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>معیارهای تمایز و تعهد کاری</span>
          </div>
          <h2 className="section-title">چرا انتخاب {lawyer.name}؟</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            رویکردی متمرکز بر دفاع مستند و علمی به دور از کلی‌گویی و وعده‌های ناممکن
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="why-grid">
          {whyChooseMe.map((item, idx) => (
            <div key={item.title || idx} className="why-card card">
              <div className="why-icon-badge">
                {featureIcons[idx % featureIcons.length]}
              </div>
              <div className="why-card-content">
                <div className="why-card-title-row">
                  <CheckCircle2 size={18} className="why-check-badge" />
                  <h3 className="why-card-title">{item.title}</h3>
                </div>
                <p className="why-card-desc">
                  {item.desc}
                </p>
                {item.badge && (
                  <span className="why-item-badge">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Counter Bar */}
        <div className="why-stats-bar">
          <div className="stat-unit">
            <span className="stat-num">۱۰۰٪</span>
            <span className="stat-caption">تعهد به محرمانگی اسرار موکل</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit">
            <span className="stat-num">رسمی</span>
            <span className="stat-caption">پروانه وکالت کانون وکلای دادگستری استان البرز</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit">
            <span className="stat-num">شفاف</span>
            <span className="stat-caption">قرارداد مالی و تعرفه مصوب</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-unit">
            <span className="stat-num">تخصصی</span>
            <span className="stat-caption">تمرکز بر دعاوی ملکی و اسناد تجاری</span>
          </div>
        </div>
      </div>
    </section>
  )
}

