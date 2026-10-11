import { useEffect, useState } from 'react'

type PreloaderProps = { onComplete: () => void }

export function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 0 : 2050)
    const finishTimer = window.setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, reducedMotion ? 0 : 2600)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(finishTimer)
    }
  }, [onComplete])

  if (!isVisible) return null

  const breakers = Array.from({ length: 7 }, (_, index) => index)

  return <div className={`preloader electrical-preloader${isLeaving ? ' is-leaving' : ''}`} aria-hidden="true">
    <div className="preloader-grid" />
    <div className="preloader-center electrical-preloader__center">
      <div className="electrical-panel" aria-label="Анимация запуска электрического щита">
        <div className="electrical-panel__label"><span>AA / CONTROL</span><i>СИСТЕМА ПИТАНИЯ</i></div>
        <div className="electrical-panel__rail">
          <div className="voltage-relay"><span>РКН</span><b>230 V</b><i /></div>
          <div className="breaker-bank">
            {breakers.map((breaker) => <div className="breaker" key={breaker}>
              <span className="breaker__lever" /><i className="breaker__indicator" /><small>{String(breaker + 1).padStart(2, '0')}</small>
            </div>)}
          </div>
        </div>
        <div className="electrical-panel__wires"><i /><i /><i /></div>
      </div>
      <div className="preloader-copy electrical-preloader__copy"><span>Запуск инженерной системы</span><strong>ПИТАНИЕ ПОДКЛЮЧЕНО</strong></div>
    </div>
    <div className="preloader-corner preloader-corner--left">МОСКВА · AA ENGINEERING</div>
    <div className="preloader-corner preloader-corner--right">ПРОВЕРКА ЦЕПИ</div>
  </div>
}
