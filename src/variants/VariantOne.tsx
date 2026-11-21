import { VideoCard } from '../VideoCard'
import { articles, videos, heroDescription, coachIntro, trainingApproach, trainingLevels } from '../content'
import { socials, youtubeVideoUrl } from '../socials'
import { CoachPhoto } from '../components/CoachPhoto'

export function VariantOne() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-inner">
          <div className="hero-content">
            <p className="eyebrow">Бразильское джиу-джитсу</p>
            <h1 id="hero-title">«Пропиздошу так, что <em>второй тренировки</em> не будет»</h1>
            <p className="hero-description">{heroDescription}</p>
            <a className="button" href="#contact">Записаться на тренировку <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="hero-photo">
            <CoachPhoto />
          </figure>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap section-grid">
          <h2>О тренере</h2>
          <div className="about-copy">
            <p className="lead">{coachIntro}</p>
            <p>{trainingApproach}</p>
            <p>{trainingLevels}</p>
          </div>
        </div>
      </section>

      <section id="videos" className="section section-dark">
        <div className="wrap">
          <div className="section-heading">
            <h2>Видео</h2>
            <a className="text-link" href={socials.youtube}>Все видео на YouTube ↗</a>
          </div>
          <div className="video-grid">
            {Object.values(videos).map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        </div>
      </section>

      <section id="blog" className="section">
        <div className="wrap">
          <h2>Блог</h2>
          <div className="article-grid">
            {articles.map(article => (
              <article className="article" key={article.title}>
                <p className="eyebrow">{article.category}</p>
                <h3>{article.title}</h3>
                <p className="muted">{article.preview}</p>
                <a className="text-link" href={youtubeVideoUrl(article.video.id)}>Смотреть выпуск ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
