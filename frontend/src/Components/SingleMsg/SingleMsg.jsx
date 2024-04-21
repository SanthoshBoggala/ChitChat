import React, { useContext } from 'react'
import './singleMsg.css'
import OwnUser from './OwnUser'
import OtherUser from './OtherUser'
import ChatContext from '../../Contexts/chatContext'

const SingleMsg = ({msg, user}) => {

    const { user: ownUser } = useContext(ChatContext)

    return (
        <>
            {ownUser.num == user ? <OwnUser msg={msg} user={user} /> : <OtherUser  msg={msg} user={user} />}
        </>
    )
}

export default SingleMsg
