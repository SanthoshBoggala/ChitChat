import React, { useContext, useEffect, useState } from 'react'
import './chatWindow.css'
import FriendPic from '../FriendPic/FriendPic'
import SingleMsg from '../SingleMsg/SingleMsg'
import NewMsg from '../NewMsg/NewMsg'
import ChatContext from '../../Contexts/chatContext'

const ChatWindow = () => {

    const { currentChat: { chat , frnd } } = useContext(ChatContext)

    return (
        <div className='chatWindow'>
            <div className='chatWindowTop'>
                <FriendPic {...frnd} />
                <div className='name mx-3'>{frnd.name}</div>
            </div>
            <div className='chattingBox'>
                { (chat && chat.data && chat.data.length !== 0) && (
                    chat.data.map((one, index) => <SingleMsg {...one} key={index}/>)
                ) }
            </div>
            <NewMsg frnd={frnd}/>
        </div>
    )
}

export default ChatWindow
