import { ContactForm } from '../ContactForm'
import { socials } from '../socials'

const weekdayClasses = [
  { start: '19:00', end: '20:30', name: 'Бразильское джиу-джитсу (в ги)' },
  { start: '20:30', end: '22:00', name: 'Грэпплинг (без ги)' },
]

export function ContactSection({ brutalist }: { brutalist: boolean }) {
  return (
    <section id="contact" className="section section-dark">
      <div className="wrap section-grid">
        <div>
          {brutalist && <p className="section-index">04 / Контакты</p>}
          <h2>На ковёр</h2>
          <section id="schedule" className="training-schedule" aria-labelledby="schedule-title">
            <h3 id="schedule-title">Расписание тренировок</h3>
            <p className="muted">По будням, с понедельника по пятницу</p>
            <dl>
              {weekdayClasses.map(({ start, end, name }) => (
                <div key={start}>
                  <dt><time dateTime={start}>{start}</time>–<time dateTime={end}>{end}</time></dt>
                  <dd>{name}</dd>
                </div>
              ))}
            </dl>
          </section>
          <p className="muted contact-intro">Напишите, чтобы записаться на тренировку.</p>
          <a className="text-link" href={socials.telegram}>@PashaChelust ↗</a>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
