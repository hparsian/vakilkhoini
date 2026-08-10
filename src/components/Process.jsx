import { process } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import { FileSearch, Compass, FileCheck2, Activity, ArrowLeft } from 'lucide-react'
import './Process.css'

const stepIcons = [
  <FileSearch size={24} />,
  <Compass size={24} />,
  <FileCheck2 size={24} />,
  <Activity size={24} />,
]

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" className="process-section" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head center reveal" ref={ref}>
          <div className="eyebrow">مراحل و گام‌های پیگیری</div>
          <h2 className="section-title" id="process-title">فرآیند همکاری و پذیرش پرونده</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            فرآیندی شفاف، نظام‌مند و مرحله‌به‌مرحله از نخستین تماس تا اجرای نهایی آراء و مصالح موکل
          </p>
        </div>

        <div className="process-timeline">
          {process.map((p, idx) => (
            <div key={p.step} className="process-card card">
              <div className="process-card-header">
                <span className="process-step-badge">{p.step}</span>
                <div className="process-icon-box" aria-hidden="true">
                  {stepIcons[idx] || <FileCheck2 size={24} />}
                </div>
              </div>

              <h3 className="process-card-title">{p.title}</h3>
              <p className="process-card-desc">
                {p.desc || p.description || 'بررسی موشکافانه اسناد و شواهد توسط وکیل جهت انتخاب بهترین راهکار قانونی.'}
              </p>

              <div className="process-card-footer">
                <span className="process-step-indicator">گام {idx + 1} از ۴</span>
              </div>
            </div>
          ))}
        </div>

        <div className="process-cta-banner">
          <div className="process-cta-text">
            <h4>آیا پرونده شما نیازمند بررسی تخصصی است؟</h4>
            <p>می‌توانید همین حالا مدارک خود را ارسال کرده یا نوبت مشاوره حضوری دریافت نمایید.</p>
          </div>
          <a href="#consultation" className="btn btn-gold">
            <span>درخواست بررسی و تعیین نوبت</span>
            <ArrowLeft size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

