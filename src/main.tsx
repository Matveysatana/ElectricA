import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LeadModalProvider } from './components/ui/LeadModal'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><LeadModalProvider><App /></LeadModalProvider></BrowserRouter></StrictMode>)
