import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { caseStudies } from '../../caseStudies'
import engineeringConcept from '../../assets/hero-engineering-concept.webp'
import { useLeadModal } from '../ui/LeadModal'
import './CaseDetailsPage.css'

const rubles = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`

export function CaseDetailsPage() {
  const { id } = useParams()
  const item = caseStudies.find((study) => study.number === id)
  const openLeadModal = useLeadModal()
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const photoTrigger = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (activePhoto === null || !item?.gallery.length) return
    closeButton.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') setActivePhoto((current) => current === null ? null : (current + 1) % item.gallery.length)
      if (event.key === 'ArrowLeft') setActivePhoto((current) => current === null ? null : (current - 1 + item.gallery.length) % item.gallery.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activePhoto, item])

  useEffect(() => {
    if (activePhoto === null) photoTrigger.current?.focus()
  }, [activePhoto])

  if (!item) return <main id="main-content" className="case-page"><div className="shell"><Link className="case-back" to="/#portfolio"><ArrowLeft size={18} /> К направлениям работ</Link><h1>Карточка объекта не найдена</h1></div></main>

  const isDemo = item.status === 'demo'
  const total = item.estimate.reduce((sum, row) => sum + row.amount * row.unitPrice, 0)
  const story = [
    { number: '01', title: 'Задача', body: item.problem || 'Добавьте исходные данные: тип объекта, запрос заказчика и ограничения по монтажу.' },
    { number: '02', title: 'Решение', body: item.solution || 'Опишите схему, выбранные материалы и основные этапы электромонтажа.' },
    { number: '03', title: 'Результат', body: item.result || 'Добавьте итог работ, проверку линий и то, что изменилось для заказчика.' },
  ]

  return <main id="main-content" className="case-page"><div className="shell">
    <Link className="case-back" to="/#portfolio"><ArrowLeft size={18} /> К направлениям работ</Link>
    <section className="case-hero" aria-labelledby="case-title">
      <div className="case-hero__copy">
        <span className="case-kicker">{isDemo ? 'ДЕМОНСТРАЦИОННЫЙ КЕЙС' : 'ШАБЛОН КЕЙСА'} · {item.number}</span>
        <h1 id="case-title">{item.title}</h1>
        <p className="case-hero__lead">{item.task}</p>
        {isDemo && <p className="case-disclaimer">Это образец оформления, а не выполненный объект: изображения созданы ИИ, параметры и смета условные. Реальную стоимость рассчитываем после оценки задачи.</p>}
        {!isDemo && <p className="case-disclaimer">Заготовка для реального объекта: замените название, факты, фотографии и смету после согласования публикации с заказчиком.</p>}
      </div>
      <div className="case-image"><img src={item.cover ?? engineeringConcept} alt={item.coverAlt ?? 'Временная иллюстрация будущего кейса'} /><span>{isDemo ? 'ИИ-ВИЗУАЛИЗАЦИЯ · ПРИМЕР' : 'МЕСТО ДЛЯ ФОТО ОБЪЕКТА'}</span></div>
    </section>

    <div className="case-facts" aria-label="Параметры проекта">{(item.facts.length ? item.facts : [
      { label: 'Тип объекта', value: 'Добавить данные' }, { label: 'Формат работ', value: 'Добавить данные' }, { label: 'Материалы', value: 'Добавить данные' },
    ]).map((fact) => <div className="case-fact" key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>

    <section className="case-section" aria-labelledby="story-title">
      <div className="case-section__heading"><span className="case-kicker">ОТ ЗАДАЧИ К РЕШЕНИЮ</span><h2 id="story-title">Что сделано на объекте</h2><p>{isDemo ? 'На примере полной замены электрики показываем, как может выглядеть история проекта.' : 'Три готовых блока для истории будущего объекта.'}</p></div>
      <div className="case-story">{story.map((part) => <article key={part.number}><span>{part.number}</span><h3>{part.title}</h3><p>{part.body}</p></article>)}</div>
    </section>

    <section className="case-section" aria-labelledby="gallery-title">
      <div className="case-section__heading"><span className="case-kicker">ФОТОГАЛЕРЕЯ</span><h2 id="gallery-title">Этапы электромонтажа</h2><p>{isDemo ? 'Восемь сгенерированных визуализаций: от пустой квартиры до готового интерьера. Не фотографии реального объекта.' : 'Восемь мест для фотографий: общий вид, этапы работ, детали и готовый результат.'}</p></div>
      <div className="case-gallery">{item.gallery.length ? item.gallery.map((photo, index) => <button type="button" className="case-gallery__item" key={photo.title} onClick={(event) => { photoTrigger.current = event.currentTarget; setActivePhoto(index) }} aria-label={`Открыть фото: ${photo.title}`}><span className="case-gallery__photo"><img src={photo.src} alt={photo.alt} loading="lazy" /></span><span className="case-gallery__caption">{photo.title}<Images size={17} /></span></button>) : Array.from({ length: 8 }, (_, index) => <div className="case-gallery__slot" key={index}><Images size={25} /><span>ФОТО {String(index + 1).padStart(2, '0')}</span></div>)}</div>
    </section>

    <section className="case-estimate" aria-labelledby="estimate-title">
      <div className="case-estimate__intro"><div><span className="case-kicker">СОСТАВ РАБОТ И МАТЕРИАЛОВ</span><h2 id="estimate-title">{isDemo ? 'Пример сметы' : 'Смета объекта'}</h2></div><p>{isDemo ? 'Цифры придуманы для демонстрации страницы. Это не прайс, не оферта и не оценка реального объекта.' : 'Добавьте согласованные объёмы, стоимость работ и материалов.'}</p></div>
      {item.estimate.length ? <><div className="case-estimate__scroll"><table><thead><tr><th scope="col">Позиция</th><th scope="col">Кол-во</th><th scope="col">Цена</th><th scope="col">Сумма</th></tr></thead><tbody>{item.estimate.map((row, index) => <tr key={`${row.title}-${index}`}><td><span>{row.group}</span>{row.title}</td><td>{row.amount} {row.unit}</td><td>{rubles(row.unitPrice)}</td><td>{rubles(row.amount * row.unitPrice)}</td></tr>)}</tbody></table></div><div className="case-estimate__total"><span>Итого по условному примеру</span><strong>{rubles(total)}</strong></div></> : <div className="case-estimate__empty">Здесь появятся позиции сметы: название, количество, цена и итог. Данные добавляются после согласования с заказчиком.</div>}
    </section>

    <section className="case-next" aria-labelledby="case-next-title"><div><span className="case-kicker">ВАША ЗАДАЧА</span><h2 id="case-next-title">Нужна электрика с нуля или решение конкретной неисправности?</h2><p>Расскажите об объекте — обсудим задачу и подготовим расчёт под ваши условия.</p></div><button className="button button-primary" type="button" onClick={() => openLeadModal('Обсудить электромонтаж')}>Обсудить задачу <ArrowRight size={18} /></button></section>
  </div>
    {activePhoto !== null && item.gallery[activePhoto] && createPortal(<div className="case-lightbox" role="dialog" aria-modal="true" aria-label={`Фото ${activePhoto + 1} из ${item.gallery.length}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePhoto(null) }}><div className="case-lightbox__bar"><span>{String(activePhoto + 1).padStart(2, '0')} / {String(item.gallery.length).padStart(2, '0')} · ИИ-ВИЗУАЛИЗАЦИЯ</span><button ref={closeButton} type="button" onClick={() => setActivePhoto(null)} aria-label="Закрыть фото"><X size={24} /></button></div><div className="case-lightbox__view"><button type="button" aria-label="Предыдущее фото" onClick={() => setActivePhoto((activePhoto - 1 + item.gallery.length) % item.gallery.length)}><ArrowLeft /></button><figure><img src={item.gallery[activePhoto].src} alt={item.gallery[activePhoto].alt} /><figcaption>{item.gallery[activePhoto].title}</figcaption></figure><button type="button" aria-label="Следующее фото" onClick={() => setActivePhoto((activePhoto + 1) % item.gallery.length)}><ArrowRight /></button></div></div>, document.body)}
  </main>
}
