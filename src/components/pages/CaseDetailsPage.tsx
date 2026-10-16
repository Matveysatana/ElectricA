import { ArrowLeft, ClipboardList, FileText, Lightbulb, WalletCards } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { directions } from '../../content'
import engineeringConcept from '../../assets/hero-engineering-concept.webp'
import './CaseDetailsPage.css'

export function CaseDetailsPage() {
  const { id } = useParams()
  const index = Math.max(0, Number(id) - 1)
  const item = directions[index]
  if (!item) return <main className="case-page"><div className="shell"><Link className="case-back" to="/#portfolio"><ArrowLeft size={18} /> К направлениям работ</Link><h1>Карточка объекта не найдена</h1></div></main>

  const details = [
    { icon: ClipboardList, title: 'Задача по объекту', text: 'Описание задачи добавляется после согласования с заказчиком.' },
    { icon: Lightbulb, title: 'Инженерное решение', text: 'Схема решения, этапы работ и использованные материалы будут добавлены в карточку объекта.' },
    { icon: WalletCards, title: 'Смета и затраты', text: 'Согласованная смета и фактические затраты появятся после получения данных по объекту.' },
    { icon: FileText, title: 'Материалы и фото', text: 'Реальные фотографии, документы и результаты работ будут прикреплены после согласования публикации.' }
  ]

  return <main className="case-page"><div className="shell">
    <Link className="case-back" to="/#portfolio"><ArrowLeft size={18} /> К направлениям работ</Link>
    <div className="case-hero"><div><span className="eyebrow">КАРТОЧКА ОБЪЕКТА · {item.number}</span><h1>{item.title}</h1><p>{item.task}</p></div><div className="case-image"><img src={engineeringConcept} alt="Концептуальная иллюстрация объекта" /><span>КОНЦЕПТУАЛЬНАЯ ИЛЛЮСТРАЦИЯ</span></div></div>
    <section className="case-details" aria-label="Структура будущего кейса">{details.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={22} /><h2>{title}</h2><p>{text}</p></article>)}</section>
  </div></main>
}
