import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Add a script tag for Tailwind CSS via CDN with dark mode configuration
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';

// Add Tailwind dark mode configuration
tailwindScript.onload = function() {
  window.tailwind.config = {
    darkMode: 'class', // Use class-based dark mode
  };
};

document.head.appendChild(tailwindScript);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
