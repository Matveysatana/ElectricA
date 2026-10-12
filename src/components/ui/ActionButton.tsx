import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ActionButtonProps = {
  children: ReactNode
  onClick: () => void
  primary?: boolean
  icon?: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function ActionButton({ children, onClick, primary = true, icon = <ArrowUpRight size={17} strokeWidth={2.2} />, type = 'button', disabled = false }: ActionButtonProps) {
  return <button type={type} className={`button ${primary ? 'button-primary' : 'button-ghost'}`} onClick={onClick} disabled={disabled}>
    {children}{icon}
  </button>
}
