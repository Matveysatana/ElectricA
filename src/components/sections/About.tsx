import { ArrowRight, ClipboardCheck, FileText, Network, UsersRound } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import arturPortrait from '../../assets/artur-alipov-cutout.webp'
import certificatePreview from '../../assets/qualification-certificate-preview.png'
import { scrollToSection } from '../../utils/navigation'

export function About() {
  const responsibilities = [
    { number: '01', icon: ClipboardCheck, title: 'Личное участие', text: 'Лично участвую в разметке, расключении и ключевых инженерных решениях.' },
    { number: '02', icon: UsersRound, title: 'Собственная бригада', text: 'Работаю со своей бригадой и контролирую комплекс электромонтажных работ на объекте.' },
    { number: '03', icon: Network, title: 'Сложные системы', text: 'Собираю электрику, слаботочные решения и подготовку под умный дом в единую логику.' }
  ]
  return <section className="about" id="about"><div className="shell about-grid">
    <div className="about-visual"><div className="about-grid-mark" aria-hidden="true" /><img src={arturPortrait} alt="Артур Алипов" /><b>10<span>ЛЕТ<br />ПРАКТИКИ</span></b></div>
    <div><SectionLabel light>Основатель · Артур Алипов</SectionLabel><h2>За каждым проектом — <em>моя ответственность.</em></h2>
      <p className="about-copy">Лично присутствую на объектах, участвую в разметке и расключении. Работа начинается с понимания пространства, техники и сценариев будущего использования.</p>
      <div className="about-responsibilities" aria-label="Принципы моей работы">{responsibilities.map(({ number, icon: Icon, title, text }) => <button type="button" key={title} onClick={() => scrollToSection('contacts')}>
        <div className="about-responsibilities__head"><span>{number}</span><Icon size={18} /><ArrowRight size={16} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p>
      </button>)}</div>
      <a className="about-document" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer" aria-label="Открыть документ о квалификации Артура Алипова">
        <span className="about-document__preview"><img src={certificatePreview} alt="Превью документа о квалификации" /></span>
        <span className="about-document__copy"><FileText size={20} /><span><strong>Документ о квалификации</strong><small>Электромонтажник 6-го разряда</small></span></span>
        <span className="about-document__action">Открыть документ <ArrowRight size={16} /></span>
      </a>
    </div>
  </div></section>
}
