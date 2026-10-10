type SectionLabelProps = { children: string; light?: boolean }

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return <p className={`eyebrow ${light ? 'light' : ''}`}>{children}</p>
}
