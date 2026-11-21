import { useEffect, useRef, useState } from 'react'
import { CoachPhoto } from '../components/CoachPhoto'
import { articles, videos, heroDescription, coachIntro, trainingApproach, trainingLevels } from '../content'
import { socials, youtubeVideoUrl } from '../socials'
import { VideoThumbnail } from '../VideoCard'

const blogArticles = [
  ...articles,
  {
    category: 'Х-гард',
    title: 'Свип из Х-гарда в ги',
    preview: 'Посмотрите, как меняется опора у партнёра перед свипом. Отметьте момент, когда он уже не может просто вернуть вес на обе ноги.',
    video: videos.xGuard,
  },
  {
    category: 'No Gi',
    title: 'Де ла Рива без ги',
    preview: 'Во второй части разбора обратите внимание, как борец сохраняет контакт с ногой партнёра без захвата за ткань.',
    video: videos.deLaRiva,
  },
  {
    category: 'Проход гарда',
    title: 'Тореандо с вышагиванием',
    preview: 'Проследите за шагом проходящего: в какой момент он уходит в сторону и что мешает партнёру снова поставить ноги между вами.',
    video: videos.toreando,
  },
]

const blogScrollSpeed = 42
const blogScrollAcceleration = 110

function BlogRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    const copy = copyRef.current
    if (!rail || !copy || typeof IntersectionObserver === 'undefined') return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hover = window.matchMedia('(any-hover: hover)')
    let visible = false
    let hovered = hover.matches && rail.matches(':hover')
    let pointerDown = false
    let frame = 0
    let lastTime = 0
    let speed = 0
    let remainder = 0

    function schedule() {
      if (!frame && visible && !paused && !motion.matches) frame = requestAnimationFrame(tick)
    }

    function tick(time: number) {
      frame = 0
      if (!rail || !copy) return

      const elapsed = lastTime ? Math.min((time - lastTime) / 1000, .05) : 0
      lastTime = time
      const resting = hovered || pointerDown || rail.matches(':focus-within')
      const speedChange = elapsed * blogScrollAcceleration
      speed = resting ? Math.max(0, speed - speedChange) : Math.min(blogScrollSpeed, speed + speedChange)

      remainder += speed * elapsed
      const step = Math.floor(remainder)
      if (step) {
        const loopWidth = copy.offsetLeft
        if (loopWidth > 0) rail.scrollLeft = (Math.max(0, rail.scrollLeft) + step) % loopWidth
        remainder -= step
      }

      if (speed || !resting) schedule()
      else lastTime = 0
    }

    function stop() {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      speed = 0
      remainder = 0
    }

    function enter(event: PointerEvent) {
      if (event.pointerType === 'touch') return
      hovered = true
      schedule()
    }

    function leave() {
      hovered = false
      schedule()
    }

    function press() {
      pointerDown = true
      stop()
    }

    function release() {
      if (!pointerDown) return
      pointerDown = false
      schedule()
    }

    function syncMotion() {
      if (!rail) return
      rail.toggleAttribute('data-loop', !motion.matches)
      if (motion.matches) stop()
      else schedule()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
      else stop()
    })

    observer.observe(rail)
    syncMotion()
    motion.addEventListener('change', syncMotion)
    rail.addEventListener('pointerenter', enter)
    rail.addEventListener('pointerleave', leave)
    rail.addEventListener('pointerdown', press)
    rail.addEventListener('focusin', stop)
    rail.addEventListener('focusout', schedule)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)

    return () => {
      stop()
      observer.disconnect()
      motion.removeEventListener('change', syncMotion)
      rail.removeEventListener('pointerenter', enter)
      rail.removeEventListener('pointerleave', leave)
      rail.removeEventListener('pointerdown', press)
      rail.removeEventListener('focusin', stop)
      rail.removeEventListener('focusout', schedule)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [paused])

  function renderArticles(copy = false) {
    return blogArticles.map(article => (
      <article key={article.title}>
        <p className="section-index">{article.category}</p>
        <h3>
          <a href={youtubeVideoUrl(article.video.id)} tabIndex={copy ? -1 : undefined}>
            {article.title} <span aria-hidden="true">↗</span>
          </a>
        </h3>
        <p>{article.preview}</p>
      </article>
    ))
  }

  return (
    <div className="wrap brutal-blog-grid">
      <div className="brutal-blog-heading">
        <div>
          <p className="section-index">03 / Блог</p>
          <h2 id="blog-title">Заметки с ковра</h2>
        </div>
        <button className="brutal-blog-toggle" type="button" onClick={() => setPaused(value => !value)}>
          {paused ? 'Возобновить прокрутку' : 'Приостановить прокрутку'}
        </button>
      </div>
      <div className="brutal-blog-rail" ref={railRef}>
        <div className="brutal-articles">{renderArticles()}</div>
        <div className="brutal-articles brutal-articles-copy" ref={copyRef} aria-hidden="true" onMouseDown={event => event.preventDefault()}>
          {renderArticles(true)}
        </div>
      </div>
    </div>
  )
}

function VideoList() {
  const [selectedId, setSelectedId] = useState<string>(videos.kneeShield.id)

  return (
    <ol className="brutal-video-list">
      {Object.values(videos).map(video => {
        const selected = selectedId === video.id
        const panelId = `video-panel-${video.id}`

        return (
          <li className="brutal-video-item" key={video.id} data-selected={selected}>
            <button
              className="brutal-video-selector"
              type="button"
              aria-expanded={selected}
              aria-controls={panelId}
              onClick={() => setSelectedId(video.id)}
            >
              <span className="brutal-video-preview" aria-hidden="true"><VideoThumbnail id={video.id} /></span>
              <span className="brutal-video-title">{video.title}</span>
            </button>
            <div className="brutal-video-panel" id={panelId} inert={!selected}>
              <div className="brutal-video-panel-inner">
                <a className="brutal-video-watch" href={youtubeVideoUrl(video.id)} aria-label={`Смотреть на YouTube: ${video.title}`}>
                  <VideoThumbnail id={video.id} />
                </a>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

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
          <VideoList />
        </div>
      </section>

      <section id="blog" className="brutal-blog" aria-labelledby="blog-title">
        <BlogRail />
      </section>
    </>
  )
}
