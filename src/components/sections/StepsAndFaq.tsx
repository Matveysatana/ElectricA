import { useEffect, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs, steps } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'

const circuitPaths = [
  'M403 82H560V168H920V184',
  'M717 246H560V332H200V348',
  'M403 410H560V496H920V512',
  'M717 574H560V660H200V676',
  'M403 738H560V824H920V840',
  'M717 902H560V988H200V1004',
  'M403 1066H560V1152H920V1168'
]

export function StepsAndFaq() {
  const [openQuestion, setOpenQuestion] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  useEffect(() => {
    let frameId: number | undefined

    const updateActiveStep = () => {
      window.cancelAnimationFrame(frameId ?? 0)
      frameId = window.requestAnimationFrame(() => {
        const section = document.getElementById('steps')
        const cards = Array.from(document.querySelectorAll<HTMLElement>('#steps .process-step'))
        if (!section || cards.length === 0) return

        const activationLine = window.innerHeight * 0.55
        const first = cards[0].getBoundingClientRect()
        const last = cards[cards.length - 1].getBoundingClientRect()
        const firstCenter = first.top + first.height / 2
        const lastCenter = last.top + last.height / 2
        const rawProgress = ((activationLine - firstCenter) / (lastCenter - firstCenter)) * (cards.length - 1)
        const nextProgress = Math.max(0, Math.min(cards.length - 1, rawProgress))

        setStepProgress((current) => Math.abs(current - nextProgress) < .002 ? current : nextProgress)
      })
    }

    updateActiveStep()
    window.addEventListener('scroll', updateActiveStep, { passive: true })
    window.addEventListener('resize', updateActiveStep)

    return () => {
      window.cancelAnimationFrame(frameId ?? 0)
      window.removeEventListener('scroll', updateActiveStep)
      window.removeEventListener('resize', updateActiveStep)
    }
  }, [])

  return <>
    <section className="section process-section" id="steps"><div className="shell process-layout">
      <div className="process-diagram" style={{ '--step-progress': stepProgress / (steps.length - 1) } as CSSProperties}>
        <svg className="process-circuit" viewBox="0 0 1120 1312" preserveAspectRatio="none" aria-hidden="true">
          {circuitPaths.map((path, index) => <path d={path} key={path} pathLength="1" style={{ '--draw-progress': Math.max(0, Math.min(1, stepProgress - index)) } as CSSProperties} />)}
        </svg>
        <ol className="steps" aria-label="Этапы реализации">
        {steps.map(({ number, title, description }, index) => {
        const state = index === Math.round(stepProgress) ? ' is-active' : index < stepProgress ? ' is-passed' : ''
        return <li className={`process-step${state}`} key={number}>
          <article className="process-step__card"><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div></article>
        </li>
      })}</ol>
      </div>
      <header className="process-heading"><SectionLabel>Процесс реализации</SectionLabel><h2>8 шагов к <em>готовой системе.</em></h2><p>Каждый этап связан с предыдущим: от первого обсуждения до проверки и передачи готовой системы.</p></header>
    </div></section>
    <section className="section faq-section" id="faq"><div className="shell faq-layout">
      <div className="faq-intro"><SectionLabel>Часто задаваемые вопросы</SectionLabel><h2>FAQ</h2><p className="muted">Собрали ответы, которые помогают сориентироваться до первого обсуждения проекта.</p></div>
      <div className="faq">{faqs.map(([question, answer], index) => {
        const isOpen = openQuestion === index
        return <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}>
          <button aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenQuestion(isOpen ? -1 : index)}><span>{question}</span><ChevronDown size={23} /></button>
          <div className="faq-answer" id={`faq-answer-${index}`} aria-hidden={!isOpen}><p>{answer}</p></div>
        </article>
      })}</div>
    </div></section>
  </>
}
