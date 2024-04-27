import React from 'react'
import './singleMsg.css'
import FriendPic from '../FriendPic/FriendPic'

const OwnUser = ({ msg, time, oldMsg, date }) => {

  return (
    <div>
      {(oldMsg === null || oldMsg.date !== date) && (
        <div className='msgDate'>
          <div>{date}</div>
        </div>
      )}
      <div className='ownUser msg'>
        <FriendPic pic={""} inChat={true} />
        <div className='msgBox colorBox'>
          {msg}
        </div>
        <div className='msgTime'>{time}</div>
      </div>
    </div>
  )
}

export default OwnUser
