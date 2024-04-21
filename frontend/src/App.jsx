import ChatPage from './ChatPage/ChatPage'
import './App.css'
import { useContext } from 'react'
import ChatContext from './Contexts/chatContext'
import LoginPage from './LoginPage/LoginPage'

function App() {
  const { user } = useContext(ChatContext)
  return (
    <>
      { user == null ? <LoginPage /> : <ChatPage />}
    </>      
  )
}

export default App
