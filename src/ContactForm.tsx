import { useState, type FormEvent } from 'react'
import { socials } from './socials'

export function ContactForm() {
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')

  async function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name')).trim()
    const message = String(data.get('message')).trim()

    if (!name || !message) {
      setDraft('')
      setStatus('Укажите имя и напишите сообщение.')
      return
    }

    const text = `Привет! Меня зовут ${name}.\n\n${message}`
    setDraft(text)
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Текст скопирован. Откройте Telegram, вставьте его в чат и нажмите «Отправить».')
    } catch {
      setStatus('Скопируйте текст из поля ниже, затем откройте Telegram и отправьте его в чате.')
    }
  }

  return (
    <form className="contact-form" onSubmit={prepareMessage} aria-describedby="form-help">
      <div>
        <label htmlFor="name">Имя</label>
        <input id="name" name="name" autoComplete="given-name" required maxLength={80} placeholder="Как к вам обращаться?" />
      </div>
      <div>
        <label htmlFor="message">Сообщение</label>
        <textarea id="message" name="message" required maxLength={1200} rows={4} placeholder="Например, хочу прийти на первую тренировку" />
      </div>
      <p id="form-help" className="muted">Форма подготовит текст для Telegram. Отправить его нужно вручную в чате.</p>
      <button className="button" type="submit">Подготовить сообщение <span aria-hidden="true">↗</span></button>
      <p role="status" className="form-status">{status}</p>
      {draft && (
        <div className="draft">
          <label htmlFor="draft">Готовый текст</label>
          <textarea id="draft" readOnly value={draft} rows={4} />
          <a className="text-link" href={socials.telegram} target="_blank" rel="noopener noreferrer">Открыть Telegram ↗</a>
        </div>
      )}
    </form>
  )
}
