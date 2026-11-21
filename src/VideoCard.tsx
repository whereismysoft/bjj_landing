import { socials } from './socials'

export type Video = { id: string; title: string }

export function VideoCard({ video }: { video?: Video }) {
  const href = video
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`
    : socials.youtube

  return (
    <a className="video-card" href={href} target="_blank" rel="noopener noreferrer">
      {video && <img src={`https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg`} alt="" loading="lazy" />}
      <span className="play-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 4v16l13-8z" /></svg>
      </span>
      <span className="video-caption">{video ? video.title : 'Открыть канал YouTube'} <span aria-hidden="true">↗</span></span>
    </a>
  )
}
