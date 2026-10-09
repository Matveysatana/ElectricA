import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ActionButton } from '../ui/ActionButton'
import { scrollToSection } from '../../utils/navigation'
import heroEngineeringConcept from '../../assets/hero-engineering-concept.webp'
import arturPortrait from '../../assets/artur-alipov-cutout.webp'

export function Hero() {
  const proofs = [['10', 'лет опыта в электромонтажных работах'], ['01', 'личный контроль на объекте'], ['06', 'направлений для сложных задач']]
  return <section className="hero" id="top">
    <div className="hero-backdrop" aria-hidden="true" />
    <div className="shell hero-frame">
      <div className="hero-meta"><span>01 / ЭЛЕКТРОМОНТАЖНЫЕ РАБОТЫ</span><span>МОСКВА / 55.7558° N</span></div>
      <figure className="hero-visual">
        <img src={heroEngineeringConcept} alt="Концептуальная иллюстрация организованной кабельной трассы и электрощита" />
        <figcaption>КОНЦЕПТУАЛЬНАЯ ИЛЛЮСТРАЦИЯ / ДО ЗАМЕНЫ НА ФОТО С ОБЪЕКТОВ</figcaption>
      </figure>
      <figure className="hero-portrait">
        <img src={arturPortrait} alt="Артур Алипов, инженер-электрик" />
        <figcaption>ЛИЧНЫЙ КОНТРОЛЬ<br />НА КАЖДОМ ОБЪЕКТЕ</figcaption>
      </figure>
      <div className="hero-content">
        <p className="hero-kicker"><i /> АРТУР АЛИПОВ / ИНЖЕНЕР-ЭЛЕКТРИК</p>
        <h1><span>ЭЛЕКТРИКА.</span><span>ПРОДУМАННАЯ</span><em>ДО ДЕТАЛЕЙ.</em></h1>
        <p className="hero-copy">Электромонтаж под ключ в Москве. От проектирования электрики до реализации сложных инженерных решений.</p>
        <div className="button-row"><ActionButton onClick={() => scrollToSection('contacts')}>Обсудить проект</ActionButton><button className="hero-text-link" onClick={() => scrollToSection('services')}>Смотреть направления работ <ArrowUpRight size={16} /></button></div>
      </div>
      <div className="hero-ledger" aria-label="Ключевые отличия">
        {proofs.map(([number, text]) => <div key={number}><b>{number}</b><span>{text}</span></div>)}
      </div>
      <button className="hero-scroll" onClick={() => scrollToSection('services')} aria-label="Перейти к направлениям работ"><span>ЛИСТАТЬ</span><ArrowDown size={16} /></button>
    </div>
  </section>
}
