import { ArrowUpRight } from 'lucide-react'
import { services } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'
import { scrollToSection } from '../../utils/navigation'

export function Services() {
  return <section className="section" id="services"><div className="shell">
    <SectionLabel>01 / НАПРАВЛЕНИЯ РАБОТ</SectionLabel>
    <div className="section-title"><h2>Система, продуманная <em>под объект.</em></h2><p>Основной фокус — полная электрика, сложные инженерные задачи и логика, которая остаётся понятной после завершения работ.</p></div>
    <div className="service-list">{services.map(({ title, description, icon: Icon }, index) => <article className="service-row" key={title}>
      <div className="service-number">0{index + 1}</div><Icon className="service-icon" size={25} /><h3>{title}</h3><p>{description}</p>
      <button onClick={() => scrollToSection('contacts')} aria-label={`Обсудить: ${title}`}><span>Обсудить</span><ArrowUpRight size={18} /></button>
    </article>)}</div>
  </div></section>
}
