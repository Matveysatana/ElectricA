import { ArrowRight, FileText } from 'lucide-react'
import { SectionLabel } from '../../ui/SectionLabel'
import arturPortrait from '../../../assets/artur-alipov-cutout.webp'
import certificatePreview from '../../../assets/qualification-certificate-preview.png'

export function About() {
  return <section className="about about--founder" id="about"><div className="shell about-grid">
    <div className="about-visual"><div className="about-grid-mark" aria-hidden="true" /><img src={arturPortrait} alt="Артур Алипов" /><b>10<span>ЛЕТ<br />ПРАКТИКИ</span></b></div>
    <div className="about-content"><SectionLabel>Основатель · Артур Алипов</SectionLabel><h2>Электромонтаж, за который <em>отвечает мастер.</em></h2>
      <p className="about-copy">Я — Артур Алипов, основатель «Электро Инжиниринг». Лично разбираюсь в задаче, согласую инженерное решение и контролирую работы на объекте — от срочного выезда до электрики под ключ.</p>
      <div className="about-facts" aria-label="Квалификация Артура Алипова"><span>10 лет практики</span><span>Электромонтажник 6-го разряда</span></div>
      <a className="about-document" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer" aria-label="Открыть документ о квалификации Артура Алипова">
        <span className="about-document__preview"><img src={certificatePreview} alt="Превью документа о квалификации" /></span>
        <span className="about-document__copy"><FileText size={20} /><span><strong>Документ о квалификации</strong><small>Электромонтажник 6-го разряда</small></span></span>
        <span className="about-document__action">Открыть документ <ArrowRight size={16} /></span>
      </a>
    </div>
  </div></section>
}
