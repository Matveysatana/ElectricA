import type { ReactNode } from 'react'
import { ArrowDownRight } from 'lucide-react'

type ActionButtonProps = {
  children: ReactNode
  onClick: () => void
  primary?: boolean
  type?: 'button' | 'submit'
}

export function ActionButton({ children, onClick, primary = true, type = 'button' }: ActionButtonProps) {
  return <button type={type} className={`button ${primary ? 'button-primary' : 'button-ghost'}`} onClick={onClick}>
    {children}<ArrowDownRight size={18} />
  </button>
}
