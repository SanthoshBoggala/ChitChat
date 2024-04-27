import React from 'react'
import './singleMsg.css'
import FriendPic from '../FriendPic/FriendPic'


const OtherUser = ({ msg, date, oldMsg, time }) => {
  return (
    <div>
      {(oldMsg === null || oldMsg.date !== date) && (
        <div className='msgDate'>
          <div>{date}</div>
        </div>
      )}
      <div className='otherUser msg'>
        <FriendPic pic={""} inChat={true} other={true} />
        <div className='msgBox otherColorBox'>
          {msg}

        </div>
        <div className='otherMsgTime'>{time}</div>
      </div>
    </div>
  )
}

export default OtherUser
