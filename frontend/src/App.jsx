import ChatPage from './ChatPage/ChatPage'
import './App.css'
import { useContext } from 'react'
import LoginPage from './LoginPage/LoginPage'
import UserContext from './Contexts/userContext'
import { ChatContextProvider } from './Contexts/chatContext'

function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      { user == null ? <LoginPage /> :
        <ChatContextProvider>
          <ChatPage />
        </ChatContextProvider>
      }
    </>      
  )
}

export default App
