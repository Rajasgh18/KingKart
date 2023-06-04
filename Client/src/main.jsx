import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ModeContext from './admin/context/ModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeContext>
        <App />
      </ModeContext>
    </BrowserRouter>
  </React.StrictMode>,
)
