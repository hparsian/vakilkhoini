import { process } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './Process.css'

export default function Process() {
  const ref = useReveal()
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="container">
        <div className="reveal" ref={ref}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title" id="process-title">فرآیند همکاری</h2>
        </div>

        <ol className="process-list">
          {process.map((p) => (
            <li key={p.step} className="process-item">
              <span className="process-step">{p.step}</span>
              <span className="process-title-text">{p.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
