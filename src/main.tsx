import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className='px-4 md:px-8 lg:px-24 '>
      <App />
    </main>
  </React.StrictMode>,
)
