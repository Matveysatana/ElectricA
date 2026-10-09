import { useEffect, useState } from 'react'

type PreloaderProps = { onComplete: () => void }

export function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 0 : 1500)
    const finishTimer = window.setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, reducedMotion ? 0 : 2200)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(finishTimer)
    }
  }, [onComplete])

  if (!isVisible) return null

  return <div className={`preloader${isLeaving ? ' is-leaving' : ''}`} aria-hidden="true">
    <div className="preloader-grid" />
    <div className="preloader-center">
      <div className="preloader-mark">A<span>/</span>A</div>
      <div className="preloader-copy"><span>System initialization</span><strong>Alipov engineering</strong></div>
      <div className="preloader-progress"><i /></div>
    </div>
    <div className="preloader-corner preloader-corner--left">01 / MOSCOW / 55.7558° N</div>
    <div className="preloader-corner preloader-corner--right">ENG.SYSTEM / READY</div>
    <div className="preloader-panel preloader-panel--one" />
    <div className="preloader-panel preloader-panel--two" />
  </div>
}
