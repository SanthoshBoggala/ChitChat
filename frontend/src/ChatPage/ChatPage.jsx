import React, { useContext } from 'react'
import './chatPage.css'
import Friends from '../Components/Friends/Friends'
import ChatWindow from '../Components/ChatWindow/ChatWindow'
import ChatContext from '../Contexts/chatContext'
import UserContext from '../Contexts/userContext'



const ChatPage = () => {
    const { currentChat, logOut } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    return (
        <div className='chatPage'>
            <div className='row g-0'>
                <div className='col-4 col-md-3 friendsDiv'>
                    <div className='switch row'>
                        <div className='col-6 active' >Friends</div>
                        <div className='col-6' >Groups
                            <div 
                                className='logOut'
                                onClick={()=> logOut()}
                            >
                                {"<<"}
                            </div>
                        </div>
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
