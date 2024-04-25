import React, { useContext } from 'react'
import './chatPage.css'
import Friends from '../Components/Friends/Friends'
import ChatWindow from '../Components/ChatWindow/ChatWindow'
import ChatContext from '../Contexts/chatContext'
import UserContext from '../Contexts/userContext'



const ChatPage = () => {
    const { currentChat, active, toggleActive, logOut } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    return (
        <div className='chatPage'>
            <div className='row g-0'>
                <div className='col-4 col-md-3 friendsDiv'>
                    <div className='friendsOutline'>
                        <div className='sideBar'>
                            <div>@</div>
                            <div
                                className='logOut'
                                onClick={() => logOut()}
                            >
                                {"<<"}
                            </div>
                        </div>
                        <div className='friendsInside'>
                            <div className='switch row g-0'>
                                <div
                                    className={active ? 'active col-6' : 'col-6'}
                                    onClick={() => toggleActive()}
                                >
                                    Friends
                                </div>
                                <div
                                    className={!active ? 'active col-6' : 'col-6'}
                                    onClick={() => toggleActive()}
                                >
                                    Groups
                                </div>
                            </div>
                            <div className='friends'>
                                <Friends />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-8 col-md-9'>
                    {(currentChat !== null && user) ? <ChatWindow /> : (
                        <div className='noConvo'>
                            Open a convo to <span className='p-2'> continue</span> Chatting...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatPage
