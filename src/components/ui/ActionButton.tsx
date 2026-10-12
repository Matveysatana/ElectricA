import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'

type ActionButtonProps = {
  children: ReactNode
  onClick: () => void
  primary?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function ActionButton({ children, onClick, primary = true, type = 'button', disabled = false }: ActionButtonProps) {
  return <button type={type} className={`button ${primary ? 'button-primary' : 'button-ghost'}`} onClick={onClick} disabled={disabled}>
    {children}<MessageCircle size={17} strokeWidth={2.2} />
  </button>
}
