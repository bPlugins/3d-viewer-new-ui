import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('bp3d-root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
