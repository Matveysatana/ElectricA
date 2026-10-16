import { useEffect, useState } from 'react'
import { ClipboardPenLine, FileText, Menu, MessageCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '../ui/ActionButton'
import { scrollToSection } from '../../utils/navigation'

const navigation = [['Услуги', 'services'], ['Об основателе', 'about'], ['Работы', 'portfolio'], ['Этапы', 'steps'], ['Контакты', 'contacts']]

export function Header({ isPricesPage = false }: { isPricesPage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goTo = (id: string) => { setIsOpen(false); scrollToSection(id) }
  return <header className="header">
    <div className="shell head-inner">
      {isPricesPage ? <Link className="brand" to="/">
        ЭЛЕКТРО <i>ИНЖИНИРИНГ</i>
      </Link> : <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); goTo('top') }}>
        ЭЛЕКТРО <i>ИНЖИНИРИНГ</i>
      </a>}
      <nav className="desktop-nav" aria-label="Основная навигация">
        {isPricesPage ? <Link to="/">На главную</Link> : navigation.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
        <Link className={isPricesPage ? 'is-current' : ''} to="/prices">Прайс</Link>
      </nav>
      <div className="head-actions">
        {isPricesPage ? <Link className="header-cta" to="/#contacts">Запросить смету <FileText size={16} /></Link> : <button className="header-cta" onClick={() => goTo('contacts')}>Обсудить проект <ClipboardPenLine size={16} /></button>}
        <button className="menu-button" aria-label="Открыть меню" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
    </div>
    {isOpen && <>
      <button className="mobile-menu-scrim" aria-label="Закрыть меню" onClick={() => setIsOpen(false)} />
      <nav className="mobile-nav is-open" aria-label="Мобильная навигация">
        {isPricesPage ? <Link to="/" onClick={() => setIsOpen(false)}>На главную<MessageCircle size={20} /></Link> : navigation.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}<MessageCircle size={20} /></button>)}
        <Link to="/prices" onClick={() => setIsOpen(false)}>Стоимость работ<MessageCircle size={20} /></Link>
        {isPricesPage ? <Link className="button button-primary" to="/#contacts" onClick={() => setIsOpen(false)}>Запросить смету<MessageCircle size={18} /></Link> : <ActionButton onClick={() => goTo('contacts')}>Обсудить задачу</ActionButton>}
      </nav>
    </>}
  </header>
}
