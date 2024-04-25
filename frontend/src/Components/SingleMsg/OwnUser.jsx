import React from 'react'
import './singleMsg.css'
import FriendPic from '../FriendPic/FriendPic'

const OwnUser = ({user, msg}) => {
  return (
    <div className='ownUser msg'>
        <div className='msgBox colorBox'>
            {msg}
            <FriendPic pic={""} inChat={true}/>
        </div>
    </div>
  )
}

export default OwnUser
