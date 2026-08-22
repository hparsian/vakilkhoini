import { lawyer } from '../data/content.js'
import { Phone, CalendarCheck, MessageCircle } from 'lucide-react'
import { useRouter } from '../router.jsx'
import './StickyMobileCTA.css'

export default function StickyMobileCTA() {
  const { pathname, navigate } = useRouter()

  const handleConsultClick = (e) => {
    if (pathname !== '/') {
      e.preventDefault()
      navigate('/#consultation')
    }
  }

  return (
    <aside className="sticky-cta" aria-label="دسترسی سریع و تماس فوری">
      <a
        href={lawyer.phoneHref}
        className="sticky-cta-btn sticky-call"
        aria-label="تماس تلفنی با وکیل"
      >
        <Phone size={18} />
        <span>تماس فوری</span>
      </a>

      <a
        href={lawyer.whatsappHref}
        className="sticky-cta-btn sticky-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ارسال پیام در واتساپ"
      >
        <MessageCircle size={18} />
        <span>واتساپ</span>
      </a>

      <a
        href="#consultation"
        onClick={handleConsultClick}
        className="sticky-cta-btn sticky-main"
        aria-label="رزرو وقت مشاوره"
      >
        <CalendarCheck size={18} />
        <span>رزرو نوبت</span>
      </a>
    </aside>
  )
}

