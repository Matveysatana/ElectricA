import { Check } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import arturPortrait from '../../assets/artur-alipov-cutout.webp'

export function About() {
  const notes = ['Личное участие в разметке и расключении', 'Собственная бригада для электромонтажных работ', 'Работа со сложными системами и умным домом']
  return <section className="about" id="about"><div className="shell about-grid">
    <div className="about-visual"><div className="about-grid-mark" aria-hidden="true" /><img src={arturPortrait} alt="Артур Алипов" /><small>АРТУР АЛИПОВ / ИНЖЕНЕР-ЭЛЕКТРИК</small><b>10<br /><span>ЛЕТ</span></b></div>
    <div><SectionLabel light>02 / ЛИЧНАЯ ОТВЕТСТВЕННОСТЬ</SectionLabel><h2>За каждым проектом — <em>личная ответственность.</em></h2>
      <p className="about-copy">Артур лично присутствует на объектах, участвует в разметке и расключении. Работа начинается с понимания пространства, техники и сценариев будущего использования.</p>
      <p className="about-copy">Бригада выполняет штробление, прокладку кабеля, монтаж подрозетников, распределительных коробок и электрощитов. Ключевые инженерные решения остаются под личным контролем Артура.</p>
      <div className="about-notes">{notes.map((note) => <div key={note}><Check size={16} />{note}</div>)}</div>
    </div>
  </div></section>
}
