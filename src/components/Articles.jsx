import { useState } from 'react'
import { articles, lawyer } from '../data/content.js'
import useReveal from '../hooks/useReveal.js'
import {
  BookOpen,
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  X,
  Share2,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import './Articles.css'

export default function Articles() {
  const headRef = useReveal()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const { showToast } = useToast()

  const categories = ['all', ...new Set(articles.map((a) => a.category).filter(Boolean))]

  const filteredArticles = articles.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  )

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast('لینک مقاله در حافظه کپی شد', 'success')
    }
  }

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
                <h3 className="article-title">{a.title}</h3>
                <p className="article-excerpt">{a.excerpt}</p>

                {/* Full article text kept in DOM for search engines; only the excerpt above is shown visually, full text opens in the reader modal on click */}
                {(a.fullContent || a.content) && (
                  <div className="visually-hidden">
                    {(a.fullContent || a.content).split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    {a.takeaways && a.takeaways.length > 0 && (
                      <ul>
                        {a.takeaways.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

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
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(a)}
                    className="article-read-btn"
                  >
                    <span>مطالعه کامل مقاله</span>
                    <ArrowLeft size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-modal-title"
        >
          <div className="modal-content modal-article-reader" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="بستن پنجره"
            >
              <X size={20} />
            </button>

            <div className="reader-header">
              <div className="reader-meta">
                <span className="reader-cat">{selectedArticle.category}</span>
                <span className="reader-date">
                  <Calendar size={14} />
                  <span>{selectedArticle.date}</span>
                </span>
                <span className="reader-time">
                  <Clock size={14} />
                  <span>زمان مطالعه: {selectedArticle.readTime || '۵ دقیقه'}</span>
                </span>
              </div>

              <h2 id="reader-modal-title" className="reader-title">
                {selectedArticle.title}
              </h2>

              <div className="reader-author-row">
                <div className="author-info">
                  <Sparkles size={16} className="author-icon" />
                  <span>نویسنده و تحلیل‌گر حقوقی: <strong>{lawyer.name}</strong> ({lawyer.title})</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleShare(selectedArticle)}
                  className="share-article-btn"
                  title="اشتراک‌گذاری"
                >
                  <Share2 size={16} />
                  <span>اشتراک‌گذاری</span>
                </button>
              </div>
            </div>

            <div className="reader-body">
              {/* If fullContent or content is present, render paragraphs */}
              {(selectedArticle.fullContent || selectedArticle.content) ? (
                (selectedArticle.fullContent || selectedArticle.content).split('\n\n').map((para, i) => (
                  <p key={i} className="reader-paragraph">
                    {para}
                  </p>
                ))
              ) : (
                <p className="reader-paragraph">{selectedArticle.excerpt}</p>
              )}

              {selectedArticle.takeaways && selectedArticle.takeaways.length > 0 && (
                <div className="reader-takeaways-box">
                  <h4 className="takeaways-title">نکات و توصیه‌های کلیدی:</h4>
                  <ul className="takeaways-list">
                    {selectedArticle.takeaways.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="reader-lawyer-note">
                <h4>نکته کلیدی حقوقی:</h4>
                <p>
                  هر پرونده دارای جزئیات اسنادی و زمانی منحصر‌به‌فرد است. توصیه می‌شود پیش از هرگونه اقدام حقوقی، ارسال اظهارنامه یا طرح دعوا در دادگاه، اسناد خود را با وکیل متخصص بررسی نمایید.
                </p>
              </div>
            </div>

            <div className="reader-footer">
              <a
                href="#consultation"
                onClick={() => setSelectedArticle(null)}
                className="btn btn-gold"
              >
                <PhoneCall size={16} />
                <span>مشاوره تخصصی با {lawyer.name} در این زمینه</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="btn btn-outline-dark"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

