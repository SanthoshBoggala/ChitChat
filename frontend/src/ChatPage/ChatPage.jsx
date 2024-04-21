import React, { useContext } from 'react'
import './chatPage.css'
import Friends from '../Components/Friends/Friends'
import ChatWindow from '../Components/ChatWindow/ChatWindow'
import ChatContext from '../Contexts/chatContext'



const ChatPage = () => {
    const { currentChat, user } = useContext(ChatContext)


    return (
        <div className='chatPage'>
            <div className='row g-0'>
                <div className='col-4 col-md-3 friendsDiv'>
                    <div className='switch'>
                        <div>Friends</div>
                        <div>Groups</div>
                    </div>
                    <div className='friends'>
                        <Friends />
                    </div>
                </div>
                <div className='col-8 col-md-9'>
                    { (currentChat !== null && user) ? <ChatWindow /> : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatPage
