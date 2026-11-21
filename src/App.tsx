import { ContactForm } from './ContactForm'
import { socials } from './socials'
import { VideoCard, type Video } from './VideoCard'

const navigation = [
  ['about', 'О тренере'],
  ['videos', 'Видео'],
  ['blog', 'Блог'],
  ['contact', 'Контакты'],
]

const videos: Video[] = []

const articles = [
  {
    category: 'Первые шаги',
    title: 'Что взять на первую тренировку',
    preview: 'Простая экипировка и несколько вещей, о которых легко забыть.',
    body: 'Возьмите воду, тапочки и сменную одежду. Заранее уточните, нужна ли форма для ги или подойдёт спортивная одежда без молний и карманов. Снимите украшения, подстригите ногти и приезжайте чуть раньше, чтобы успеть переодеться.',
  },
  {
    category: 'Тренировочный процесс',
    title: 'Как работать в спарринге',
    preview: 'Одна задача на раунд помогает замечать ошибки и отслеживать прогресс.',
    body: 'Выберите позицию, в которой хотите разобраться, и обсудите задачу с партнёром. Начинайте в темпе, в котором можете следить за техникой. Если приём уже зафиксирован или вам некомфортно, постучите и остановитесь. После раунда разберите один момент, который хотите попробовать снова.',
  },
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

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">К содержанию</a>
      <header id="top" className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav aria-label="Основная навигация">
            {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-inner">
            <div className="hero-content">
              <p className="eyebrow">Бразильское джиу-джитсу</p>
              <h1 id="hero-title">«Пропиздошу так, что <em>второй тренировки</em> не будет»</h1>
              <p className="hero-description">Тренировки с Пашей Челюсть. Разбираем технику и проверяем её в спарринге.</p>
              <a className="button" href="#contact">Записаться на тренировку <span aria-hidden="true">↗</span></a>
            </div>
            <figure className="hero-photo">
              <img src={`${import.meta.env.BASE_URL}coach.jpg`} alt="Паша Челюсть в белом ги с чёрным поясом" width="1002" height="1280" fetchPriority="high" />
            </figure>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap section-grid">
            <h2>О тренере</h2>
            <div className="about-copy">
              <p className="lead">Я Паша Челюсть, тренер по бразильскому джиу-джитсу.</p>
              <p>На тренировке разбираем, как работает позиция, а затем пробуем её с сопротивлением. Если движение не получается, смотрим, где теряется контроль, и пробуем снова.</p>
              <p>Если вы только начинаете, разберём базовые позиции и правила работы в паре. Если уже боретесь, можем поработать над ситуациями, в которых вы застреваете в спарринге.</p>
            </div>
          </div>
        </section>

        <section id="videos" className="section section-dark">
          <div className="wrap section-grid">
            <h2>Видео</h2>
            <div>
              <p className="muted section-intro">Подборка видео появится здесь. Пока можно перейти на канал Паши.</p>
              {videos.length ? <div className="video-grid">{videos.map(video => <VideoCard key={video.id} video={video} />)}</div> : <VideoCard />}
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
                  <details>
                    <summary>Читать</summary>
                    <p>{article.body}</p>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-dark">
          <div className="wrap section-grid">
            <div>
              <h2>На ковёр</h2>
              <p className="muted contact-intro">Напишите, чтобы узнать расписание и договориться о тренировке.</p>
              <a className="text-link" href={socials.telegram}>@PashaChelust ↗</a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Brand />
          <nav aria-label="Социальные сети">
            <a href={socials.telegram}>Telegram</a>
            <a href={socials.vk}><VkIcon />ВКонтакте</a>
            <a href={socials.youtube}>YouTube</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
