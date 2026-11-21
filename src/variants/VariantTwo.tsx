import { CoachPhoto } from '../components/CoachPhoto'
import { articles, videos, heroDescription, coachIntro, trainingApproach, trainingLevels } from '../content'
import { socials, youtubeVideoUrl } from '../socials'
import { VideoCard } from '../VideoCard'

export function VariantTwo() {
  return (
    <>
      <section className="brutal-hero" aria-labelledby="hero-title">
        <figure className="brutal-portrait">
          <CoachPhoto />
          <figcaption>Паша Челюсть</figcaption>
        </figure>
        <div className="wrap brutal-hero-copy">
          <p className="section-index">Бразильское джиу-джитсу</p>
          <h1 id="hero-title">
            <span>«Пропиздошу</span>{' '}
            <span>так, что второй</span>{' '}
            <span>тренировки</span>{' '}
            <span className="outline-line">не будет»</span>
          </h1>
          <p className="brutal-hero-intro">{heroDescription}</p>
          <a className="button" href="#contact">
            Записаться на тренировку
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 13 13 3M6 3h7v7" />
            </svg>
          </a>
        </div>
      </section>

      <section id="about" className="brutal-about" aria-labelledby="about-title">
        <div className="wrap brutal-about-grid">
          <figure className="brutal-detail"><CoachPhoto detail /></figure>
          <div className="brutal-about-copy">
            <p className="section-index">01 / О тренере</p>
            <h2 id="about-title">На ковре<br />с Пашей Челюсть</h2>
            <p className="brutal-lead">{coachIntro}</p>
            <p>{trainingApproach}</p>
            <p>{trainingLevels}</p>
          </div>
        </div>
      </section>

      <section id="videos" className="brutal-video-section" aria-labelledby="videos-title">
        <div className="wrap">
          <div className="brutal-section-heading">
            <div>
              <p className="section-index">02 / Видео</p>
              <h2 id="videos-title">Борьба лёжа</h2>
            </div>
            <a className="text-link" href={socials.youtube}>Все видео на YouTube ↗</a>
          </div>
          <div className="brutal-video-grid">
            <div className="brutal-video-feature"><VideoCard video={videos.kneeShield} /></div>
            <div className="brutal-video-list">
              {Object.values(videos).filter(video => video.id !== videos.kneeShield.id).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="brutal-blog" aria-labelledby="blog-title">
        <div className="wrap brutal-blog-grid">
          <div>
            <p className="section-index">03 / Блог</p>
            <h2 id="blog-title">Заметки<br />с ковра</h2>
          </div>
          <div className="brutal-articles">
            {articles.map(article => (
              <article key={article.title}>
                <p className="section-index">{article.category}</p>
                <h3><a href={youtubeVideoUrl(article.video.id)}>{article.title} <span aria-hidden="true">↗</span></a></h3>
                <p>{article.preview}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
