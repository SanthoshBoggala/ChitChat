import React from 'react'
import './chatPage.css'
import Friends from '../Components/Friends/Friends'
import ChatWindow from '../Components/ChatWindow/ChatWindow'

const ChatPage = () => {
  return (
    <div className='chatPage'>
      <div className='row g-0'>
        <div className='col-4 col-md-3'>
            <div className='switch'>
                friends groups 
            </div>
            <div className='friends'>
                <Friends />
            </div>
        </div>
        <div className='col-8 col-md-9'>
            <ChatWindow />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
