import { MessageCircle } from 'lucide-react'
import { services } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'
import { scrollToSection } from '../../utils/navigation'

export function Services() {
  return <section className="section" id="services"><div className="shell">
    <SectionLabel>Что входит в электромонтаж</SectionLabel>
    <div className="section-title services-title"><h2>Электромонтаж под ключ — <em>от задачи до готовой системы.</em></h2><p>Выберите направление. Каждая карточка ведёт к заявке, чтобы сразу обсудить ваш объект.</p></div>
    <div className="services-grid">{services.map(({ title, description, icon: Icon }, index) => <article className="service-tile" key={title} role="button" tabIndex={0} onClick={() => scrollToSection('contacts')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); scrollToSection('contacts') } }}>
      <span className="service-tile__top"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={24} /></span><h3>{title}</h3><p>{description}</p>
      <span className="service-tile__action" aria-hidden="true">Обсудить задачу <MessageCircle size={17} /></span>
    </article>)}</div>
  </div></section>
}
