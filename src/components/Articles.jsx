import { articles } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import './Articles.css'

function ArticleCard({ article }) {
  const ref = useReveal()
  return (
    <article className="article-card card reveal" ref={ref}>
      <div className="article-thumb" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M5 4h11l3 3v13H5V4Z" strokeLinejoin="round"/>
          <path d="M9 10h7M9 14h7M9 18h4" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="article-body">
        <time className="article-date">{article.date}</time>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <a href="#contact" className="article-link">مطالعه مقاله ‹</a>
      </div>
    </article>
  )
}

export default function Articles() {
  const headRef = useReveal()
  return (
    <section id="articles">
      <div className="container">
        <div className="reveal" ref={headRef}>
          <div className="seal-divider"><span className="diamond" /><span className="line" /></div>
          <h2 className="section-title">مقالات حقوقی</h2>
          <p className="section-subtitle">یادداشت‌ها و راهنماهایی برای آشنایی بیشتر با فرآیندهای حقوقی</p>
        </div>

        <div className="articles-grid">
          {articles.map((a) => (
            <ArticleCard article={a} key={a.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
