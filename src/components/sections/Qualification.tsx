import { BadgeCheck, FileText, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import certificatePreview from '../../assets/qualification-certificate-preview.png'
import { scrollToSection } from '../../utils/navigation'

export function Qualification() {
  return <section className="qualification section" id="qualification"><div className="shell qualification-layout">
    <div>
      <SectionLabel>Компетенции</SectionLabel>
      <h2>Компетенции, подтверждённые <em>практикой.</em></h2>
      <p className="qualification-copy">Работаю в электромонтаже 10 лет, лично участвую в ключевых этапах и контролирую работу своей бригады на объекте.</p>
      <div className="qualification-facts">
        <button type="button" onClick={() => scrollToSection('contacts')}><strong>10 лет</strong><span>опыта в электромонтажных работах</span></button>
        <button type="button" onClick={() => scrollToSection('contacts')}><UserRoundCheck size={23} /><span>лично участвую в разметке и расключении</span></button>
        <button type="button" onClick={() => scrollToSection('contacts')}><ShieldCheck size={23} /><span>квалификация подтверждена документом</span></button>
      </div>
    </div>
    <aside className="document-card">
      <a className="document-preview" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer"><img src={certificatePreview} alt="Фрагмент свидетельства о моей профессиональной квалификации" /><span><FileText size={18} /> СВИДЕТЕЛЬСТВО О КВАЛИФИКАЦИИ</span></a>
      <div><p>Электромонтажник 6 разряда</p><small>Моя квалификация подтверждена документом в электромонтаже домовых электрических систем и оборудования.</small></div>
      <a className="document-status" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer"><BadgeCheck size={19} /> Открыть документ</a>
    </aside>
  </div></section>
}
