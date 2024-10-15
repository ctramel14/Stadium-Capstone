import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='12533499710-3gpqbbkrj6chhl5pr6qat5htvtqf8f7v.apps.googleusercontent.com'>
  <StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </StrictMode>
  </GoogleOAuthProvider>
)
