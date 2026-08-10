import { lawyer, whyChooseMe } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './WhyChooseMe.css'

export default function WhyChooseMe() {
  const ref = useReveal()
  return (
    <section className="why">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">چرا {lawyer.name}؟</h2>
        </div>

        <ul className="why-list">
          {whyChooseMe.map((item) => (
            <li key={item}>
              <span className="why-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
