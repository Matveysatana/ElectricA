import { site } from '../../content'
import { Link } from 'react-router-dom'

export function Footer() {
  return <footer><div className="shell footer-main">
    <div className="footer-brand"><strong>ELECTRICAL <i>ENGINEERING</i></strong><p>Электромонтаж под ключ в Москве.</p></div>
    <nav aria-label="Навигация в подвале"><Link to="/#services">Направления работ</Link><Link to="/#steps">Как мы работаем</Link><Link to="/prices">Прайс-лист</Link></nav>
    <div className="footer-contact">{site.phone ? <a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a> : <span>Телефон будет добавлен</span>}{site.telegramUrl && <a href={site.telegramUrl}>Telegram</a>}{site.maxUrl && <a href={site.maxUrl}>MAX</a>}</div>
  </div><div className="shell footer-inner">
    <span>© {new Date().getFullYear()} Electrical Engineering · {site.city}</span>
    {site.policyUrl ? <a href={site.policyUrl}>Политика обработки данных</a> : <span>Юридические документы добавляются до публикации</span>}
  </div></footer>
}
