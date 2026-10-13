import { useState } from 'react'
import { lawyer } from '../data/content.js'
import heroPortrait from '../assets/hero-portrait.jpg'
import useReveal from '../hooks/useReveal.js'
import { Award, ShieldCheck, BookOpen, GraduationCap, CheckCircle2, Phone, Calendar } from 'lucide-react'
import { Link } from '../router.jsx'
import './About.css'

const credentials = [
  { label: 'نام کامل', value: lawyer.name },
  { label: 'مرجع صدور پروانه', value: lawyer.barAssociation },
  { label: 'حوزه تخصصی', value: 'دعاوی ملکی، تجاری، قراردادها و اسناد تجاری' },
  { label: 'منطقه فعالیت', value: `${lawyer.city} (${lawyer.region}) و کلیه مراجع قضایی استان` },
  { label: 'رویکرد کاری', value: 'دفاع مستند، صداقت در سنجش شانس موفقیت، گزارش‌دهی مستمر' },
  { label: 'نحوه پذیرش', value: 'مشاوره حضوری در دفتر سعادت‌آباد و مشاوره تخصصی تلفنی' },
]

export default function About() {
  const ref = useReveal()
  const [activeTab, setActiveTab] = useState('bio')

  return (
    <section id="about" className="about-section" aria-label="درباره وکیل">
      <div className="container">
        <div className="about-inner reveal" ref={ref}>
          {/* Visual Column */}
          <div className="about-media-col">
            <div className="about-portrait-card">
              <div className="about-portrait-frame">
                <img
                  src={heroPortrait}
                  alt={`${lawyer.name}، ${lawyer.title}`}
                  width="400"
                  height="400"
                  className="about-img"
                  loading="lazy"
                />
              </div>

              {/* Official Seal overlay */}
              <div className="about-seal-card">
                <div className="seal-icon-wrapper">
                  <ShieldCheck size={28} />
                </div>
                <div className="seal-info">
                  <span className="seal-title">عضو کانون وکلای مرکز</span>
                  <span className="seal-subtitle">دارای پروانه رسمی و معتبر وکالت دادگستری</span>
                </div>
              </div>

              <div className="about-quick-actions">
                <a href={lawyer.phoneHref} className="btn btn-outline-dark about-call-btn">
                  <Phone size={16} />
                  <span>تماس مستقیم:</span>
                  <span className="phone-number" dir="ltr">{lawyer.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Text & Details Column */}
          <div className="about-content-col">
            <div className="eyebrow">
              <GraduationCap size={14} />
              <span>معرفی و رزومه حرفه‌ای</span>
            </div>

            <h2 className="section-title">
              {lawyer.name}
              <span className="title-caption"> | {lawyer.title}</span>
            </h2>

            <div className="seal-divider">
              <span className="diamond" />
              <span className="line" />
            </div>

            {/* Tab Controls */}
            <div className="about-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'bio'}
                className={`about-tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
                onClick={() => setActiveTab('bio')}
              >
                <BookOpen size={16} />
                <span>بیوگرافی و دیدگاه</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'credentials'}
                className={`about-tab-btn ${activeTab === 'credentials' ? 'active' : ''}`}
                onClick={() => setActiveTab('credentials')}
              >
                <Award size={16} />
                <span>مشخصات و مجوزها</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'values'}
                className={`about-tab-btn ${activeTab === 'values' ? 'active' : ''}`}
                onClick={() => setActiveTab('values')}
              >
                <ShieldCheck size={16} />
                <span>منشور اخلاقی دفتر</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="about-tab-panel">
              {activeTab === 'bio' && (
                <div className="panel-fade">
                  <p className="about-paragraph highlight-p">
                    {lawyer.bio}
                  </p>
                  <p className="about-paragraph">
                    در دنیای پیچیده روابط حقوقی امروز، پیشگیری از ایجاد اختلاف از طریق تدوین قراردادهای محکم و استاندارد، بسیار کم‌هزینه‌تر و مطمئن‌تر از طرح دعاوی طولانی‌مدت در دادگاه‌هاست. با این حال، در صورت بروز اختلاف قضایی، تسلط بر آرای وحدت رویه، قوانین خاص و فن دفاع مستند در دادگاه‌ها، برگ برنده موکلین خواهد بود.
                  </p>
                  <div className="about-quote">
                    «صداقت با موکل در اعلام درصد شانس موفقیت پرونده و خودداری از ایجاد امیدهای واهی، نخستین و مهم‌ترین وظیفه اخلاقی یک وکیل است.»
                  </div>
                </div>
              )}

              {activeTab === 'credentials' && (
                <div className="panel-fade">
                  <dl className="credentials-grid">
                    {credentials.map((c) => (
                      <div className="credential-box" key={c.label}>
                        <dt>{c.label}</dt>
                        <dd>{c.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="panel-fade">
                  <ul className="values-list">
                    <li>
                      <CheckCircle2 size={18} className="val-icon" />
                      <div>
                        <strong>حفظ مطلق اسرار و محرمانگی اطلاعات موکل:</strong> تمامی مدارک، اسناد، صداها و اطلاعات مالی و خانوادگی موکلین در امانت کامل نگهداری می‌شوند.
                      </div>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="val-icon" />
                      <div>
                        <strong>شفافیت مالی و قرارداد شفاف حق‌الوکاله:</strong> بدون هیچ‌گونه هزینه پنهان، تمامی مراحل مالی طبق قرارداد شفاف و مشخص تعیین می‌گردد.
                      </div>
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="val-icon" />
                      <div>
                        <strong>ارائه گزارش گام‌به‌گام روند رسیدگی:</strong> موکل در تمامی جلسات، ابلاغیه‌ها و صدور آرای بدوی و تجدیدنظر به صورت منظم در جریان قرار می‌گیرد.
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="about-footer-cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/darbareh" className="btn btn-outline-dark">
                <span>مشاهده سوابق کامل و مجوزها</span>
              </Link>
              <Link to="/moshavere" className="btn btn-gold">
                <Calendar size={18} />
                <span>تعیین وقت مشاوره با {lawyer.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

