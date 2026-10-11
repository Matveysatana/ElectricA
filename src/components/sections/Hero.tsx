import { ListChecks } from 'lucide-react'
import { ActionButton } from '../ui/ActionButton'
import { scrollToSection } from '../../utils/navigation'
import heroElectricalPanel from '../../assets/hero-electrical-panel.png'

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero-backdrop" aria-hidden="true" />
    <div className="shell hero-frame">
      <div className="hero-content">
        <p className="hero-kicker">АРТУР АЛИПОВ <span>ИНЖЕНЕР-ЭЛЕКТРИК</span> <span>МОСКВА</span></p>
        <h1><span>ЭЛЕКТРИКА.</span><span>ПРОДУМАННАЯ</span><em>ДО ДЕТАЛЕЙ.</em></h1>
        <p className="hero-copy">Электромонтаж под ключ в Москве. Инженерный подход, личный контроль и собственная бригада.</p>
        <div className="button-row"><ActionButton onClick={() => scrollToSection('contacts')}>Обсудить проект</ActionButton><button className="hero-text-link" onClick={() => scrollToSection('services')}><ListChecks size={18} /> Смотреть направления работ</button></div>
        <ul className="hero-facts" aria-label="Ключевые факты"><li>10 лет опыта</li><li>6-й разряд</li><li>Личный контроль</li></ul>
      </div>
      <figure className="hero-visual">
        <img src={heroElectricalPanel} alt="Аккуратно собранный электрический щит" />
        <figcaption>АККУРАТНАЯ СБОРКА ЩИТА</figcaption>
      </figure>
    </div>
  </section>
}
