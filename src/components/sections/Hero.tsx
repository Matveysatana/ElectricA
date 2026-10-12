import { ListChecks } from 'lucide-react'
import { ActionButton } from '../ui/ActionButton'
import { scrollToSection } from '../../utils/navigation'
import heroInterior from '../../assets/hero-interior-electrical-engineering.png'

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero-backdrop" aria-hidden="true" />
    <div className="shell hero-frame">
      <div className="hero-content">
        <p className="hero-kicker">ЭЛЕКТРО ИНЖИНИРИНГ <span>ЭЛЕКТРОМОНТАЖ · МОСКВА</span></p>
        <h1><span>СРОЧНЫЙ РЕМОНТ</span><span>ЭЛЕКТРИКИ И</span><span>ЭЛЕКТРОМОНТАЖ</span><em>ПОД КЛЮЧ В МОСКВЕ.</em></h1>
        <p className="hero-copy">Электромонтаж под ключ для квартир, частных домов и ремонта в Москве. От первого разговора и понятной сметы до аккуратной сборки щита, прокладки кабеля и проверки готовой системы — с личным контролем ключевых решений.</p>
        <div className="button-row"><ActionButton onClick={() => scrollToSection('contacts')}>Обсудить проект</ActionButton><button className="hero-text-link" onClick={() => scrollToSection('services')}><ListChecks size={18} /> Смотреть направления работ</button></div>
        <ul className="hero-facts" aria-label="Ключевые факты"><li>10 лет практики</li><li>6-й разряд</li><li>Личный контроль</li></ul>
      </div>
      <figure className="hero-visual">
        <img src={heroInterior} alt="Готовый современный интерьер с аккуратно встроенным электрощитом" />
        <figcaption>ГОТОВЫЙ ИНТЕРЬЕР · ПРОДУМАННАЯ ЭЛЕКТРИКА</figcaption>
      </figure>
    </div>
  </section>
}
