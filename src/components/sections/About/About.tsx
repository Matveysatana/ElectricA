import { ArrowUpRight, FileText } from 'lucide-react'
import { SectionLabel } from '../../ui/SectionLabel'
import arturPortrait from '../../../assets/artur-alipov-cutout.webp'
import certificatePreview from '../../../assets/qualification-certificate-preview.png'

export function About() {
  return <section className="about about--founder" id="about" aria-labelledby="founder-title">
    <div className="shell about-grid">
      <figure className="about-visual">
        <img src={arturPortrait} alt="Артур Алипов, основатель компании «Электро Инжиниринг»" />
      </figure>

      <div className="about-content">
        <SectionLabel>Основатель компании</SectionLabel>
        <h2 id="founder-title">Электромонтаж, за который <em>отвечает мастер.</em></h2>
        <div className="about-identity"><strong>Артур Алипов</strong><span>Основатель «Электро Инжиниринг»</span></div>
        <p className="about-copy">Лично разбираюсь в задачах заказчиков, подбираю инженерные решения и контролирую работу бригады на объекте — от срочного ремонта до электромонтажа под ключ.</p>

        <ul className="about-facts" aria-label="Опыт и квалификация Артура Алипова">
          <li><strong>10 лет</strong><span>практики</span></li>
          <li><strong>6-й разряд</strong><span>электромонтажника</span></li>
          <li><strong>Личный контроль</strong><span>работ на объекте</span></li>
        </ul>

        <a className="about-document" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer" aria-label="Посмотреть документ о квалификации Артура Алипова">
          <span className="about-document__preview"><img src={certificatePreview} alt="Превью документа о квалификации" /></span>
          <span className="about-document__copy"><FileText size={19} aria-hidden="true" /><span><strong>Документ о квалификации</strong><small>Электромонтажник 6-го разряда</small></span></span>
          <span className="about-document__action">Посмотреть <ArrowUpRight size={16} aria-hidden="true" /></span>
        </a>
      </div>
    </div>
  </section>
}
