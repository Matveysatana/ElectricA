import { SectionLabel } from '../ui/SectionLabel'

const advantages = [
  ['control', 'Личный контроль', 'Артур лично присутствует на объекте и участвует в ключевых этапах.'],
  ['team', 'Собственная бригада', 'Команда выполняет полный комплекс электромонтажных работ.'],
  ['systems', 'Сложные системы', 'Слаботочные решения и подготовка электрики для умного дома.'],
  ['wiring', 'Полная проводка', 'Основной фокус — комплексная электрика квартир и частных домов.']
]

export function Advantages() {
  return <section className="section tight"><div className="shell"><SectionLabel>Как строится работа</SectionLabel><div className="adv-grid">
    {advantages.map(([key, title, description]) => <article key={key}><h3>{title}</h3><p>{description}</p></article>)}
  </div></div></section>
}
