import React from 'react'
import './singleMsg.css'
import OwnUser from './OwnUser'
import OtherUser from './OtherUser'

const SingleMsg = (msg) => {

    const myUser = "santhosh"

    return (
        <>
            {msg.user === myUser ? <OwnUser  {...msg} /> : <OtherUser {...msg} />}
        </>
    )
}

export default SingleMsg
