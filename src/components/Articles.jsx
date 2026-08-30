import { useState } from 'react'
import { articles } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import { Link } from '../router.jsx'
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
} from 'lucide-react'
import './Articles.css'

export default function Articles() {
  const headRef = useReveal()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))]

  const filteredArticles = articles.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  )

  return (
    <section id="articles" className="articles-section" aria-label="مقالات و راهنماهای حقوقی">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <div className="eyebrow">
            <BookOpen size={14} />
            <span>آموزش و آگاهی‌بخشی حقوقی</span>
          </div>
          <h2 className="section-title">یادداشت‌ها و مقالات تخصصی</h2>
          <div className="seal-divider">
            <span className="line left-line" />
            <span className="diamond" />
            <span className="line" />
          </div>
          <p className="section-subtitle">
            تحلیل کاربردی رویه‌های قضایی، بررسی نکات کلیدی قراردادها و راهنمای پیشگیری از دعاوی
          </p>
        </div>

        {/* Popular Articles Row */}
        <div className="popular-articles-row">
          <h3 className="popular-articles-title">📊 مقالات پربازدید</h3>
          <div className="popular-articles-chips">
            {articles.filter((a) =>
              ['cheque-new-law', 'monookhoroji-chist', 'taghfif-amval-va-hesab-banki', 'vekalat-bala-ezl-khatarat', 'mashavere-hoghooghi-rayegan'].includes(a.id)
            ).map((a) => (
              <Link to={`/maghalat/${a.id}`} key={a.id} className="popular-chip">
                <span className="popular-chip-dot" />
                <span>{a.title.length > 40 ? a.title.slice(0, 40) + '…' : a.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="articles-filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`article-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'همه مقالات' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.map((a) => (
            <article className="article-card card" key={a.id}>
              <div className="article-thumb">
                <span className="article-cat-badge">{a.category || 'حقوقی'}</span>
                <div className="article-meta-row">
                  <span className="article-read-time">
                    <Clock size={13} />
                    <span>{a.readTime || '۵ دقیقه'}</span>
                  </span>
                  <span className="article-date">
                    <Calendar size={13} />
                    <span>{a.date}</span>
                  </span>
                </div>
              </div>

              <div className="article-body">
                <h3 className="article-title">
                  <Link to={`/maghalat/${a.id}`}>{a.title}</Link>
                </h3>
                <p className="article-excerpt">{a.excerpt}</p>

                {a.tags && (
                  <div className="article-tags">
                    {a.tags.map((t, idx) => (
                      <span className="article-tag" key={idx}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="article-footer">
                  <Link to={`/maghalat/${a.id}`} className="article-read-btn">
                    <span>مطالعه کامل مقاله</span>
                    <ArrowLeft size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="articles-view-all">
          <Link to="/maghalat" className="btn btn-outline-dark">
            مشاهده همه مقالات حقوقی
          </Link>
        </div>
      </div>
    </section>
  )
}
