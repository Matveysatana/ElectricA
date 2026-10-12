import { useState } from 'react'
import { MessageCircle, Phone, Send } from 'lucide-react'
import { site } from '../../content'
import { ActionButton } from '../ui/ActionButton'
import { SectionLabel } from '../ui/SectionLabel'

type FormFields = { name: string; phone: string; comment: string; consent: boolean }

function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits && !digits.startsWith('7')) digits = `7${digits}`
  digits = digits.slice(0, 11)
  if (!digits) return ''
  return `+7${digits.slice(1, 4) ? ` (${digits.slice(1, 4)}` : ''}${digits.length >= 4 ? ')' : ''}${digits.slice(4, 7) ? ` ${digits.slice(4, 7)}` : ''}${digits.slice(7, 9) ? `-${digits.slice(7, 9)}` : ''}${digits.slice(9, 11) ? `-${digits.slice(9, 11)}` : ''}`
}

export function Contact() {
  const [form, setForm] = useState<FormFields>({ name: '', phone: '', comment: '', consent: false })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const update = <Key extends keyof FormFields>(key: Key, value: FormFields[Key]) => setForm((current) => ({ ...current, [key]: value }))
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isSubmitting) return
    if (!form.name.trim() || form.phone.replace(/\D/g, '').length !== 11 || !form.consent) { setMessage('Укажите имя, российский номер телефона и подтвердите согласие.'); return }
    if (!site.formEndpoint) { setMessage('Форма ещё не подключена к приёму заявок. Используйте контакт после его добавления.'); return }
    setIsSubmitting(true)
    try { const response = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); setMessage(response.ok ? 'Заявка отправлена.' : 'Не удалось отправить заявку. Попробуйте связаться другим способом.'); if (response.ok) setForm({ name: '', phone: '', comment: '', consent: false }) }
    catch { setMessage('Не удалось отправить заявку. Проверьте подключение или используйте другой способ связи.') }
    finally { setIsSubmitting(false) }
  }
  return <section className="contact" id="contacts"><div className="shell contact-grid"><div>
    <SectionLabel light>Связаться</SectionLabel><h2>Обсудим ваш <em>проект?</em></h2><p>Расскажите, где планируются электромонтажные работы. Уточним задачу и обсудим дальнейшие шаги.</p>
    <div className="contact-links">{site.phone ? <a href={`tel:${site.phone.replace(/\D/g, '')}`}><Phone /> {site.phone}</a> : <span><Phone /> Телефон добавляется</span>}{site.whatsappUrl && <a href={site.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>}{site.telegramUrl && <a href={site.telegramUrl} target="_blank" rel="noreferrer"><Send /> Telegram</a>}{site.maxUrl && <a href={site.maxUrl} target="_blank" rel="noreferrer"><MessageCircle /> MAX</a>}{site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}</div><small className="city">{site.city}</small>
  </div><form className="contact-form" onSubmit={submit} noValidate>
      <label>Ваше имя<input value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" placeholder="Как к вам обращаться" /></label><label>Телефон<input value={form.phone} onChange={(event) => update('phone', formatRussianPhone(event.target.value))} inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" /></label><label>Комментарий<textarea value={form.comment} onChange={(event) => update('comment', event.target.value)} placeholder="Коротко опишите задачу" rows={4} /></label><label className="consent"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} /><span>Согласен(а) на обработку персональных данных{site.policyUrl ? <> согласно <a href={site.policyUrl}>политике</a></> : ' (ссылка на политику добавляется)'}</span></label>{message && <p className={`form-message${message === 'Заявка отправлена.' ? ' is-success' : ''}`} role="status">{message}</p>}<ActionButton type="submit" onClick={() => undefined} disabled={isSubmitting} icon={<Send size={17} strokeWidth={2.2} />}>{isSubmitting ? 'Отправляем…' : 'Отправить запрос'}</ActionButton>
    </form></div></section>
}
