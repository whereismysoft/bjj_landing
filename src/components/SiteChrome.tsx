import { socials } from '../socials'
import { VariantSwitcher, type VariantSwitcherProps } from './VariantSwitcher'

const navigation = [
  ['about', 'О тренере'],
  ['videos', 'Видео'],
  ['blog', 'Блог'],
  ['contact', 'Контакты'],
]

function Brand() {
  return <a href="#top" className="brand"><span className="brand-mark" aria-hidden="true" />CHELUST <b>BJJ</b></a>
}

function VkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12.785 17.62c-5.327 0-8.367-3.65-8.493-9.72H7c.087 4.46 2.055 6.35 3.613 6.74V7.9h2.55v3.847c1.537-.166 3.15-1.92 3.694-3.847h2.55c-.417 2.374-2.171 4.129-3.416 4.85 1.245.584 3.242 2.113 4.001 4.87h-2.81c-.594-1.842-2.074-3.267-4.019-3.462v3.462z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M21 4 3 11l4.6 1.6L19 6.5l-9 8.2v4.1l2.6-2.5 4.8 3.6L21 4Z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path fillRule="evenodd" d="M21.6 7.1a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.3a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.9a2.5 2.5 0 0 0 1.8 1.8c1.6.3 7.8.3 7.8.3s6.2 0 7.8-.3a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.9.4-4.9s0-3.3-.4-4.9ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
  )
}

export function SiteHeader(props: VariantSwitcherProps) {
  return (
    <header id="top" className="site-header">
      <div className="wrap header-inner">
        <Brand />
        <nav aria-label="Основная навигация">
          {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <VariantSwitcher {...props} />
      </div>
    </header>
  )
}

export function SiteFooter({ brutalist }: { brutalist: boolean }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Brand />
        <nav aria-label="Социальные сети">
          <a href={socials.telegram}>{brutalist && <TelegramIcon />}Telegram</a>
          <a href={socials.vk}><VkIcon />ВКонтакте</a>
          <a href={socials.youtube}>{brutalist && <YouTubeIcon />}YouTube</a>
        </nav>
      </div>
    </footer>
  )
}
