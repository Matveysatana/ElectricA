import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs, steps } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'

export function StepsAndFaq() {
  const [openQuestion, setOpenQuestion] = useState(0)
  return <>
    <section className="section process-section" id="steps"><div className="shell process-grid">
      <div className="process-intro"><SectionLabel>Процесс реализации</SectionLabel><h2>Восемь шагов к <em>готовой системе.</em></h2><p className="muted">Прозрачная последовательность от первого звонка до подписания акта. Детали согласуются после оценки задачи.</p></div>
      <ol className="steps">{steps.map(([number, title]) => <li key={number}><b>{number}</b><span>{title}</span></li>)}</ol>
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
