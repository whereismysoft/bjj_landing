import { youtubeVideoUrl } from './socials'

type Video = { id: string; title: string }

export function VideoThumbnail({ id }: { id: string }) {
  const thumbnail = `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`

  return (
    <span className="video-thumbnail">
      <img src={thumbnail} alt="" loading="lazy" width="480" height="360" onError={event => { event.currentTarget.hidden = true }} />
      <span className="play-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 4v16l13-8z" /></svg>
      </span>
    </span>
  )
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <a className="video-card" href={youtubeVideoUrl(video.id)}>
      <VideoThumbnail id={video.id} />
      <span className="video-caption">{video.title} <span aria-hidden="true">↗</span></span>
    </a>
  )
}
