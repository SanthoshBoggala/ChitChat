import React from 'react'
import './friendPic.css'

const FriendPic = ({pic, inChat = false, other=false}) => {


    return (
        <div className={ inChat ? (other ? "other inChatProfilePic" : "inChatProfilePic") :'profilePic'}>
            <img
                src={pic}
                alt='user pic'
            />
        </div>
    )
}

export default FriendPic
