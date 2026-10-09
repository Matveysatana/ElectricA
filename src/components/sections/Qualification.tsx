import { FileText, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { SectionLabel } from '../ui/SectionLabel'

export function Qualification() {
  return <section className="qualification section" id="qualification"><div className="shell qualification-layout">
    <div>
      <SectionLabel>04 / КОМПЕТЕНЦИИ</SectionLabel>
      <h2>Компетенции, подтверждённые <em>практикой.</em></h2>
      <p className="qualification-copy">Артур работает в электромонтаже 10 лет, лично участвует в ключевых этапах и контролирует работу собственной бригады на объекте.</p>
      <div className="qualification-facts">
        <div><strong>10 лет</strong><span>опыта в электромонтажных работах</span></div>
        <div><UserRoundCheck size={23} /><span>личное участие в разметке и расключении</span></div>
        <div><ShieldCheck size={23} /><span>квалификация публикуется после проверки документа</span></div>
      </div>
    </div>
    <aside className="document-card">
      <div className="document-preview"><FileText size={42} /><span>ДОКУМЕНТ<br />ГОТОВИТСЯ К ПУБЛИКАЦИИ</span></div>
      <div><p>Подтверждение квалификации</p><small>Перед публикацией документ необходимо проверить и при необходимости скрыть чувствительные персональные данные.</small></div>
      <span className="document-status">ОЖИДАЕТ СОГЛАСОВАНИЯ</span>
    </aside>
  </div></section>
}
