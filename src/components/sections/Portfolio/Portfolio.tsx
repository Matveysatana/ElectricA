import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { caseStudies as directions } from '../../../caseStudies'
import { SectionLabel } from '../../ui/SectionLabel'
import engineeringConcept from '../../../assets/hero-engineering-concept.webp'

export function Portfolio() {
  const navigate = useNavigate()
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLButtonElement>(null)
  const stepRef = useRef(0)
  const isPositioning = useRef(false)
  const isAnimating = useRef(false)
  const animationTimer = useRef<number | null>(null)
  const cards = useMemo(() => [...directions, ...directions, ...directions], [])

  const positionInMiddle = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport || !stepRef.current) return
    viewport.scrollLeft = directions.length * stepRef.current
  }, [])
  const move = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport || !stepRef.current || isAnimating.current) return
    isAnimating.current = true
    viewport.scrollBy({ left: stepRef.current * direction, behavior: 'smooth' })
    if (animationTimer.current) window.clearTimeout(animationTimer.current)
    animationTimer.current = window.setTimeout(() => { isAnimating.current = false }, 520)
  }, [])
  const maintainLoop = () => {
    const viewport = viewportRef.current
    const loopWidth = directions.length * stepRef.current
    if (!viewport || !loopWidth || isPositioning.current) return
    if (viewport.scrollLeft <= stepRef.current * 2) {
      isPositioning.current = true
      viewport.scrollLeft += loopWidth
      isPositioning.current = false
    } else if (viewport.scrollLeft >= loopWidth * 2) {
      isPositioning.current = true
      viewport.scrollLeft -= loopWidth
      isPositioning.current = false
    }
  }

  useLayoutEffect(() => {
    const update = () => {
      const card = cardRef.current
      if (!card) return
      stepRef.current = card.offsetWidth + Number.parseFloat(getComputedStyle(card.parentElement!).gap)
      positionInMiddle()
    }
    const frame = window.requestAnimationFrame(update)
    window.addEventListener('resize', update)
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', update) }
  }, [positionInMiddle])

  useEffect(() => {
    const timer = window.setInterval(() => move(1), 15000)
    return () => { window.clearInterval(timer); if (animationTimer.current) window.clearTimeout(animationTimer.current) }
  }, [move])

  return <section className="portfolio" id="portfolio"><div className="shell">
    <SectionLabel light>Направления работ</SectionLabel>
    <div className="section-title inverse directions-heading"><div><h2>Инженерные решения <em>для разных задач.</em></h2><p>Первый кейс — демонстрация того, как будут выглядеть подробные проекты со сметой и фото. Остальные карточки готовы к публикации реальных объектов.</p></div></div>
    <div className="directions-viewport" ref={viewportRef} onScroll={maintainLoop} aria-label="Бесконечный слайдер направлений работ">
      <div className="directions-track">{cards.map((item, index) => <button className={`direction-card${item.status === 'demo' ? ' direction-card--demo' : ''}`} type="button" key={`${item.number}-${index}`} ref={index === directions.length ? cardRef : undefined} onClick={() => navigate(`/cases/${item.number}`)} aria-label={`Открыть кейс: ${item.title}`}>
        <div className="direction-card__image"><img src={item.cover ?? engineeringConcept} alt="" draggable={false} loading="lazy" /><span>{item.status === 'demo' ? 'ДЕМО-КЕЙС · ИИ-ВИЗУАЛИЗАЦИЯ' : 'ЗАГЛУШКА'}</span><b>{item.number}</b></div>
        <div className="direction-card__copy"><h3>{item.title}</h3><p>{item.task}</p><span>Открыть карточку объекта</span></div>
      </button>)}</div>
    </div>
    <div className="directions-controls directions-controls--bottom" aria-label="Управление слайдером направлений"><button type="button" onClick={() => move(-1)} aria-label="Предыдущая карточка"><ArrowLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Следующая карточка"><ArrowRight size={20} /></button></div>
  </div></section>
}
