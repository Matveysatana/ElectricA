import { useEffect, useState } from 'react'
import { ClipboardPenLine, FileText, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '../ui/ActionButton'
import { useLeadModal } from '../ui/LeadModal'
import { scrollToSection } from '../../utils/navigation'

const navigation = [['Услуги', 'services'], ['Об основателе', 'about'], ['Работы', 'portfolio'], ['Этапы', 'steps'], ['Контакты', 'contacts']]

export function Header({ isPricesPage = false }: { isPricesPage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const openLeadModal = useLeadModal()

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isOpen)
    return () => { document.body.classList.remove('mobile-menu-open') }
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
        {isPricesPage ? <button className="header-cta" onClick={() => openLeadModal('Запросить смету')}>Запросить смету <FileText size={16} /></button> : <button className="header-cta" onClick={() => openLeadModal('Обсудить проект')}>Обсудить проект <ClipboardPenLine size={16} /></button>}
        <button className="menu-button" aria-label="Открыть меню" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
    </div>
    {isOpen && <>
      <button className="mobile-menu-scrim" aria-label="Закрыть меню" onClick={() => setIsOpen(false)} />
      <nav className="mobile-nav is-open" aria-label="Мобильная навигация">
        {isPricesPage ? <Link to="/" onClick={() => setIsOpen(false)}>На главную</Link> : navigation.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
        <Link to="/prices" onClick={() => setIsOpen(false)}>Стоимость работ</Link>
        {isPricesPage ? <ActionButton onClick={() => { setIsOpen(false); openLeadModal('Запросить смету') }} icon={<FileText size={18} />}>Запросить смету</ActionButton> : <ActionButton onClick={() => { setIsOpen(false); openLeadModal('Обсудить проект') }} icon={<ClipboardPenLine size={17} />}>Обсудить проект</ActionButton>}
      </nav>
    </>}
  </header>
}
