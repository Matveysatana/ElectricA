import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Preloader } from './components/layout/Preloader'
import { PricesPage } from './components/pages/PricesPage'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Portfolio } from './components/sections/Portfolio'
import { Services } from './components/sections/Services'
import { StepsAndFaq } from './components/sections/StepsAndFaq'

export default function App() {
  const location = useLocation()
  const isPricesPage = ['/price', '/prices'].includes(location.pathname)
  const [hasCompletedIntro, setHasCompletedIntro] = useState(() => isPricesPage)
  const isLoading = !hasCompletedIntro
  const finishLoading = useCallback(() => {
    setHasCompletedIntro(true)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('page-is-loading', isLoading)
    document.body.classList.toggle('page-is-ready', !isLoading)
    return () => { document.body.classList.remove('page-is-loading'); document.body.classList.remove('page-is-ready') }
  }, [isLoading])

  useEffect(() => {
    document.title = isPricesPage ? 'Стоимость электромонтажных работ — Электро Инжиниринг' : 'Электро Инжиниринг — срочный ремонт электрики и электромонтаж в Москве'
    document.querySelector('meta[name="description"]')?.setAttribute('content', isPricesPage ? 'Прайс-лист Электро Инжиниринг. Точная стоимость согласуется после оценки задачи.' : 'Электро Инжиниринг — срочный ремонт электрики и электромонтаж под ключ в Москве.')
  }, [isPricesPage])

  useEffect(() => {
    const targetId = location.hash.replace('#', '')
    if (targetId) window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }))
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  useEffect(() => {
    const targets = document.querySelectorAll('.section-title, .service-tile, .about-grid > *, .about-responsibilities button, .work-card, .contact-grid > *, .price-tabs, .price-table-wrap, .price-cta')
    targets.forEach((target) => target.classList.add('reveal-on-scroll'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [location.pathname])

  return <>
    {!hasCompletedIntro && <Preloader onComplete={finishLoading} />}
    <a className="skip-link" href="#main-content">Перейти к содержанию</a>
    <Header isPricesPage={isPricesPage} />
    <Routes location={location}>
      <Route path="/" element={<main id="main-content"><Hero /><Services /><About /><Portfolio /><StepsAndFaq /><Contact /></main>} />
      <Route path="/prices" element={<PricesPage />} />
      <Route path="/price" element={<PricesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </>
}
