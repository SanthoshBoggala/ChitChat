import React from 'react'
import './singleMsg.css'
import FriendPic from '../FriendPic/FriendPic'


const OtherUser = ({msg, user}) => {
  return (
    <div className='otherUser msg'>
        <div className='msgBox otherColorBox'>
            {msg}
            <FriendPic pic={""} inChat={true}/>
        </div>  
    </div>
  )
}

export default OtherUser
