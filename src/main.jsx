import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authProvider'
import { WatchlistProvider } from './context/WatchlistProvider'
import { ToastProvider } from './context/ToastProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
