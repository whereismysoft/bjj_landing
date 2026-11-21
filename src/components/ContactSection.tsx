import { ContactForm } from '../ContactForm'
import { socials } from '../socials'

export function ContactSection({ brutalist }: { brutalist: boolean }) {
  return (
    <section id="contact" className="section section-dark">
      <div className="wrap section-grid">
        <div>
          {brutalist && <p className="section-index">04 / Контакты</p>}
          <h2>На ковёр</h2>
          <p className="muted contact-intro">Напишите, чтобы узнать расписание и договориться о тренировке.</p>
          <a className="text-link" href={socials.telegram}>@PashaChelust ↗</a>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
