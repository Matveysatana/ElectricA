import { HardHat, ListChecks } from 'lucide-react'
import { ActionButton } from '../../ui/ActionButton'
import { scrollToSection } from '../../../utils/navigation'
import heroInterior from '../../../assets/hero-electrical-interior-v2.png'

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero-backdrop" aria-hidden="true" />
    <div className="shell hero-frame">
      <div className="hero-content">
        <h1><span>СРОЧНЫЙ РЕМОНТ</span><span>ЭЛЕКТРИКИ И</span><span>ЭЛЕКТРОМОНТАЖ</span><em>ПОД КЛЮЧ В МОСКВЕ.</em></h1>
        <p className="hero-copy">Плановый электромонтаж под ключ и аварийный выезд по Москве. Помогаю устранить неисправности с розетками, освещением, автоматами и щитами, а для больших задач проектирую и собираю систему целиком.</p>
        <div className="button-row"><ActionButton onClick={() => scrollToSection('contacts')} icon={<HardHat size={18} strokeWidth={2.1} />}>Вызвать электрика</ActionButton><button className="hero-text-link" onClick={() => scrollToSection('services')}><ListChecks size={18} /> Смотреть направления работ</button></div>
        <ul className="hero-facts" aria-label="Ключевые факты"><li>Аварийный выезд</li><li>Электрик на час</li><li>Инженерный монтаж</li></ul>
      </div>
      <figure className="hero-visual">
        <img src={heroInterior} alt="Готовый современный интерьер с аккуратно встроенным электрощитом" />
        <figcaption>ГОТОВЫЙ ИНТЕРЬЕР · ПРОДУМАННАЯ ЭЛЕКТРИКА</figcaption>
      </figure>
    </div>
  </section>
}
