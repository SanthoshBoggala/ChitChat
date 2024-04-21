import React, { useContext } from 'react'
import './singleFrnd.css'
import FriendPic from '../FriendPic/FriendPic'
import ChatContext from '../../Contexts/chatContext'

const SingleFrnd = ({frnd}) => {
  const { openConvo } = useContext(ChatContext)

  return (
    <div 
      className='singleFrnd'
      onClick={()=> openConvo(frnd) }
    >
      <FriendPic {...frnd}/>
      <div className='name'>
        {frnd.name}
      </div>
      <div className='notifi'>
        23
      </div>
    </div>
  )
}

export default SingleFrnd
