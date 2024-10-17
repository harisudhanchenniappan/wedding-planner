import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EventPlanner from './components/EventPlanner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
  </StrictMode>,
)
