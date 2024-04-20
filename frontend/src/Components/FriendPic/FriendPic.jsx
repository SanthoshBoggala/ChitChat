import React from 'react'
import './friendPic.css'

const FriendPic = ({pic, inChat = false}) => {
    return (
        <div className={ inChat ? "inChatProfilePic" :'profilePic'}>
            <img
                src={pic}
                alt='user pic'
            />
        </div>
    )
}

export default FriendPic
