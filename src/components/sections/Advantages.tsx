import { SectionLabel } from '../ui/SectionLabel'

const advantages = [
  ['01', 'Личный контроль', 'Артур лично присутствует на объекте и участвует в ключевых этапах.'],
  ['02', 'Собственная бригада', 'Команда выполняет полный комплекс электромонтажных работ.'],
  ['03', 'Сложные системы', 'Слаботочные решения и подготовка электрики для умного дома.'],
  ['04', 'Полная проводка', 'Основной фокус — комплексная электрика квартир и частных домов.']
]

export function Advantages() {
  return <section className="section tight"><div className="shell"><SectionLabel>03 / ПОДХОД</SectionLabel><div className="adv-grid">
    {advantages.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
  </div></div></section>
}
