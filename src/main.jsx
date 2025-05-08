import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const baseUrl = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') 
  ? '/' : "/Elixir/";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
