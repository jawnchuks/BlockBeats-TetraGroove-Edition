import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TetrisProvider } from './hooks/useTetris.hook.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TetrisProvider>
      <App />
    </TetrisProvider>
  </React.StrictMode>,
)
