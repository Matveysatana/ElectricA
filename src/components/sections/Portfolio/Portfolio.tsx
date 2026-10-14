import { useState } from 'react'
import { X } from 'lucide-react'
import { portfolio } from '../../../content'
import { SectionLabel } from '../../ui/SectionLabel'
import engineeringConcept from '../../../assets/hero-engineering-concept.webp'

export function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null)
  return <section className="portfolio" id="portfolio"><div className="shell">
    <SectionLabel light>Работы</SectionLabel>
    <div className="section-title inverse"><h2>Направления и примеры <em>инженерных решений.</em></h2><p>Это место для будущих фотографий с объектов. Названия, площади и результаты не заявляются до получения подтверждённых материалов.</p></div>
    <div className="portfolio-grid">{portfolio.map((item, index) => <button className="work-card" key={item.title} onClick={() => setSelected(index)} aria-label={`Открыть ${item.title}`}>
      <div className={`work-image work-image--${index + 1}`}><img src={engineeringConcept} alt="" /><span>КОНЦЕПТУАЛЬНАЯ<br />ИЛЛЮСТРАЦИЯ</span><b>0{index + 1}</b></div><div><h3>{item.title}</h3><p>{item.task}</p></div>
    </button>)}</div>
  </div>
    {selected !== null && <div className="modal" role="dialog" aria-modal="true" aria-label="Просмотр работы" onClick={() => setSelected(null)}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Закрыть" onClick={() => setSelected(null)}><X /></button><div className="modal-visual"><img src={engineeringConcept} alt="Концептуальная иллюстрация инженерного монтажа" /></div><h3>{portfolio[selected].title}</h3><p>{portfolio[selected].task}</p></div>
    </div>}
  </section>
}
