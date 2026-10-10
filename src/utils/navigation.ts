/** Smoothly scrolls to a named page section. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id)
  if (!section) return

  const headerOffset = 92
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
