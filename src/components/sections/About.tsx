import { ArrowRight, ClipboardCheck, Network, UsersRound } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import arturPortrait from '../../assets/artur-alipov-cutout.webp'
import { scrollToSection } from '../../utils/navigation'

export function About() {
  const responsibilities = [
    { number: '01', icon: ClipboardCheck, title: 'Личное участие', text: 'Лично участвую в разметке, расключении и ключевых инженерных решениях.' },
    { number: '02', icon: UsersRound, title: 'Собственная бригада', text: 'Работаю со своей бригадой и контролирую комплекс электромонтажных работ на объекте.' },
    { number: '03', icon: Network, title: 'Сложные системы', text: 'Собираю электрику, слаботочные решения и подготовку под умный дом в единую логику.' }
  ]
  return <section className="about" id="about"><div className="shell about-grid">
    <div className="about-visual"><div className="about-grid-mark" aria-hidden="true" /><img src={arturPortrait} alt="Артур Алипов" /><b>10<br /><span>ЛЕТ</span></b></div>
    <div><SectionLabel light>Обо мне</SectionLabel><h2>За каждым проектом — <em>моя ответственность.</em></h2>
      <p className="about-copy">Лично присутствую на объектах, участвую в разметке и расключении. Работа начинается с понимания пространства, техники и сценариев будущего использования.</p>
      <div className="about-responsibilities" aria-label="Принципы моей работы">{responsibilities.map(({ number, icon: Icon, title, text }) => <button type="button" key={title} onClick={() => scrollToSection('contacts')}>
        <div className="about-responsibilities__head"><span>{number}</span><Icon size={18} /><ArrowRight size={16} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p>
      </button>)}</div>
      <p className="about-footer-note">С моей бригадой выполняем штробление, прокладку кабеля, монтаж подрозетников, распределительных коробок и электрощитов.</p>
    </div>
  </div></section>
}
