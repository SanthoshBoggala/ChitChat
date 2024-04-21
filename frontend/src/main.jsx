import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChatContextProvider } from './Contexts/chatContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>,
)
