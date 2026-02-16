import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'sonner/dist/styles.css'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
