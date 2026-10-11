import { MessageCircle } from 'lucide-react'
import { services } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'
import { scrollToSection } from '../../utils/navigation'

export function Services() {
  return <section className="section" id="services"><div className="shell">
    <SectionLabel>Направления работ</SectionLabel>
    <div className="section-title"><h2>Система, продуманная <em>под объект.</em></h2><p>Основной фокус — полная электрика, сложные инженерные задачи и логика, которая остаётся понятной после завершения работ.</p></div>
    <div className="service-list">{services.map(({ title, description, icon: Icon }, index) => <article className="service-row" key={title} role="button" tabIndex={0} onClick={() => scrollToSection('contacts')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); scrollToSection('contacts') } }}>
      <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="service-icon-wrap"><Icon className="service-icon" size={23} /></span><h3>{title}</h3><p>{description}</p>
      <span className="service-action" aria-hidden="true">Обсудить <MessageCircle size={18} /></span>
    </article>)}</div>
  </div></section>
}
