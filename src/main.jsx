import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Tailwind CDN конфигурацийг relative URL-тай болгох
const baseUrl = "/Elixir/";

// Add a script tag for Tailwind CSS via CDN with dark mode configuration
// Use a preconnect for Tailwind CDN
const preconnect = document.createElement('link');
preconnect.rel = 'preconnect';
preconnect.href = 'https://cdn.tailwindcss.com';
document.head.appendChild(preconnect);

// Add script with defer attribute for better performance
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
tailwindScript.defer = true;  // Add defer attribute

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
