import { useState } from 'react'
import { faqs } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './FAQ.css'

function FaqItem({ item, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <h3>
        <button
          id={buttonId}
          className="faq-question"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? -1 : index)}
        >
          <span>{item.q}</span>
          <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-answer"
        hidden={!isOpen}
      >
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useReveal()

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">سوالات متداول</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <FaqItem
              item={item}
              index={i}
              key={item.q}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
