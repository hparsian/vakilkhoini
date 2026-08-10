import { lawyer } from '../data/content.js'
import heroPortrait from '../assets/hero-portrait.jpg'
import useReveal from '../hooks/useReveal.js'
import './About.css'

const facts = [
  { label: 'نام', value: lawyer.name },
  { label: 'سمت', value: lawyer.title },
  { label: 'شهر', value: lawyer.city },
  { label: 'حوزه فعالیت', value: 'دعاوی حقوقی عمومی' },
  { label: 'رویکرد', value: 'اخلاق‌مدارانه' },
]

export default function About() {
  const ref = useReveal()
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-media reveal" ref={ref}>
          <div className="about-frame">
            <img src={heroPortrait} alt={`${lawyer.name}، ${lawyer.title}`} width="380" height="380" />
          </div>
        </div>

        <div className="about-copy">
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">{lawyer.name}</h2>
          <p className="about-text">
            من، پرستو خوئینی، وکیل پایه یک دادگستری در تهران هستم و در زمینه دعاوی حقوقی عمومی
            فعالیت می‌کنم. رویکرد من در ارائه خدمات حقوقی بر پایه دقت، مسئولیت‌پذیری، اخلاق
            حرفه‌ای و حفظ محرمانگی اطلاعات موکل است.
          </p>

          <dl className="about-facts">
            {facts.map((f) => (
              <div className="about-fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
