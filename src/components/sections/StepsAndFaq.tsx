import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs, steps } from '../../content'
import { SectionLabel } from '../ui/SectionLabel'

export function StepsAndFaq() {
  const [openQuestion, setOpenQuestion] = useState(0)
  return <>
    <section className="section process-section" id="steps"><div className="shell process-grid">
      <div className="process-intro"><SectionLabel>06 / ПРОЦЕСС РЕАЛИЗАЦИИ</SectionLabel><h2>Восемь шагов к <em>готовой системе.</em></h2><p className="muted">Прозрачная последовательность от первого звонка до подписания акта. Детали согласуются после оценки задачи.</p></div>
      <ol className="steps">{steps.map(([number, title]) => <li key={number}><b>{number}</b><span>{title}</span></li>)}</ol>
    </div></section>
    <section className="section faq-section" id="faq"><div className="shell faq-layout">
      <div><SectionLabel>07 / ЧАСТЫЕ ВОПРОСЫ</SectionLabel><h2>Коротко о важном.</h2><p className="muted">Ответы на вопросы, которые чаще всего возникают до начала работ.</p></div>
      <div className="faq">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}>{question}<ChevronDown size={20} /></button>{openQuestion === index && <p>{answer}</p>}</div>)}</div>
    </div></section>
  </>
}
