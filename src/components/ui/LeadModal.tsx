import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Send, X } from 'lucide-react'
import { site } from '../../content'

type LeadModalContextValue = { openLeadModal: (subject: string) => void }
const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) throw new Error('useLeadModal must be used inside LeadModalProvider')
  return context.openLeadModal
}

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits && !digits.startsWith('7')) digits = `7${digits}`
  digits = digits.slice(0, 11)
  if (!digits) return ''
  return `+7${digits.slice(1, 4) ? ` (${digits.slice(1, 4)}` : ''}${digits.length >= 4 ? ')' : ''}${digits.slice(4, 7) ? ` ${digits.slice(4, 7)}` : ''}${digits.slice(7, 9) ? `-${digits.slice(7, 9)}` : ''}${digits.slice(9, 11) ? `-${digits.slice(9, 11)}` : ''}`
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openLeadModal = (nextSubject: string) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSubject(nextSubject)
    setMessage('')
  }
  const close = () => {
    if (isSubmitting) return
    setSubject(null)
    setMessage('')
    window.requestAnimationFrame(() => {
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus()
      document.querySelector<HTMLElement>('.menu-button')?.focus()
    })
  }

  useEffect(() => {
    if (!subject) return
    nameRef.current?.focus()
    const backdrop = dialogRef.current?.parentElement
    const onBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) event.preventDefault()
    }
    backdrop?.addEventListener('wheel', onBackgroundScroll, { passive: false })
    backdrop?.addEventListener('touchmove', onBackgroundScroll, { passive: false })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); return }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href]'))
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      backdrop?.removeEventListener('wheel', onBackgroundScroll)
      backdrop?.removeEventListener('touchmove', onBackgroundScroll)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [subject, isSubmitting])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    if (!name.trim() || phone.replace(/\D/g, '').length !== 11 || !consent) {
      setMessage('Укажите имя, российский номер телефона и подтвердите согласие.')
      return
    }
    if (!site.formEndpoint) {
      setMessage('Форма пока не подключена к приёму заявок. Отправка станет доступна после подключения.')
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, comment: comment.trim(), consent, subject }),
      })
      if (!response.ok) throw new Error('Request failed')
      setMessage('Заявка отправлена.')
      setName(''); setPhone(''); setComment(''); setConsent(false)
    } catch {
      setMessage('Не удалось отправить заявку. Попробуйте позже или свяжитесь другим способом.')
    } finally { setIsSubmitting(false) }
  }

  return <LeadModalContext.Provider value={{ openLeadModal }}>
    {children}
    {subject && createPortal(<div className="lead-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
      <div className="lead-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-describedby="lead-modal-description">
        <button type="button" className="lead-modal-close" onClick={close} aria-label="Закрыть форму"><X size={22} /></button>
        <p className="lead-modal-brand">ЭЛЕКТРО <span>ИНЖИНИРИНГ</span></p>
        <p className="lead-modal-subject">{subject}</p>
        <h2 id="lead-modal-title">Расскажите о задаче</h2>
        <p id="lead-modal-description" className="lead-modal-intro">Оставьте телефон и короткое описание. Мы уточним детали и свяжемся с вами.</p>
        <form onSubmit={submit} noValidate>
          <label>Как к вам обращаться<input ref={nameRef} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Ваше имя" /></label>
          <label>Телефон<input value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" /></label>
          <label>Кратко о задаче <span>(необязательно)</span><textarea value={comment} onChange={(event) => setComment(event.target.value)} rows={3} placeholder="Например: не работает розетка или нужна смета" /></label>
          <label className="lead-modal-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>Согласен(а) на обработку персональных данных{site.policyUrl ? <> согласно <a href={site.policyUrl}>политике</a></> : ' (ссылка на политику добавляется)'}</span></label>
          {message && <p className={`lead-modal-message${message === 'Заявка отправлена.' ? ' is-success' : ''}`} role="status">{message}</p>}
          <button className="button button-primary lead-modal-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Отправляем…' : 'Отправить заявку'} <Send size={17} /></button>
        </form>
      </div>
    </div>, document.body)}
  </LeadModalContext.Provider>
}
