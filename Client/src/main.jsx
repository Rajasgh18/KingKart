import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ModeContext from './admin/context/ModeContext.jsx'
import { UserState } from './customer/context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserState>
        <ModeContext>
          <App />
        </ModeContext>
      </UserState>
    </BrowserRouter>
  </React.StrictMode>,
)
