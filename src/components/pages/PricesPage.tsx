import { useState } from 'react'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { priceCategories } from '../../content'
import { useLeadModal } from '../ui/LeadModal'

export function PricesPage() {
  const openLeadModal = useLeadModal()
  const [activeCategory, setActiveCategory] = useState(priceCategories[0].id)
  const active = priceCategories.find((category) => category.id === activeCategory) ?? priceCategories[0]

  return <main id="main-content" className="price-page">
    <section className="price-hero">
      <div className="shell">
        <Link className="back-link" to="/"><ArrowLeft size={16} /> На главную</Link>
        <p className="hero-kicker">Стоимость работ</p>
        <h1><span>СТОИМОСТЬ</span><span>ЭЛЕКТРОМОНТАЖНЫХ</span><em>РАБОТ.</em></h1>
        <p>Прайс структурирован по направлениям. Точная стоимость определяется после оценки задачи и согласования сметы.</p>
      </div>
    </section>
    <section className="price-content">
      <div className="shell">
        <div className="price-tabs" role="tablist" aria-label="Категории прайса">
          {priceCategories.map((category) => <button key={category.id} role="tab" aria-selected={category.id === active.id} className={category.id === active.id ? 'is-active' : ''} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}
        </div>
        <div className="price-table-wrap">
          {active.items.length ? <table><thead><tr><th>Наименование работы</th><th>Ед.</th><th>Стоимость</th></tr></thead><tbody>{active.items.map((item) => <tr key={item.title}><td>{item.title}</td><td>{item.unit}</td><td>{item.price}</td></tr>)}</tbody></table> : <div className="price-empty"><span>0{priceCategories.indexOf(active) + 1}</span><div><h2>Прайс уточняется</h2><p>Стоимость по направлению «{active.label}» будет опубликована после подтверждения заказчиком. Для точного расчёта отправьте краткое описание объекта.</p></div></div>}
        </div>
        <div className="price-cta"><div><p className="eyebrow">Индивидуальный расчёт</p><h2>Нужна смета под ваш проект?</h2></div><button className="button button-primary" onClick={() => openLeadModal('Запросить смету')}>Запросить смету <MessageCircle size={18} /></button></div>
      </div>
    </section>
  </main>
}
