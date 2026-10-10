import { BadgeCheck, FileText, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'
import certificatePreview from '../../assets/qualification-certificate-preview.png'

export function Qualification() {
  return <section className="qualification section" id="qualification"><div className="shell qualification-layout">
    <div>
      <SectionLabel>Компетенции</SectionLabel>
      <h2>Компетенции, подтверждённые <em>практикой.</em></h2>
      <p className="qualification-copy">Артур работает в электромонтаже 10 лет, лично участвует в ключевых этапах и контролирует работу собственной бригады на объекте.</p>
      <div className="qualification-facts">
        <div><strong>10 лет</strong><span>опыта в электромонтажных работах</span></div>
        <div><UserRoundCheck size={23} /><span>личное участие в разметке и расключении</span></div>
        <div><ShieldCheck size={23} /><span>квалификация подтверждена документом</span></div>
      </div>
    </div>
    <aside className="document-card">
      <div className="document-preview"><img src={certificatePreview} alt="Фрагмент свидетельства о профессиональной квалификации Артура Алипова" /><span><FileText size={18} /> СВИДЕТЕЛЬСТВО О КВАЛИФИКАЦИИ</span></div>
      <div><p>Электромонтажник 6 разряда</p><small>Документ подтверждает профессиональную квалификацию в электромонтаже домовых электрических систем и оборудования.</small></div>
      <a className="document-status" href="/documents/artur-alipov-electromontazhnik-6-razryad.pdf" target="_blank" rel="noreferrer"><BadgeCheck size={19} /> Открыть документ</a>
    </aside>
  </div></section>
}
