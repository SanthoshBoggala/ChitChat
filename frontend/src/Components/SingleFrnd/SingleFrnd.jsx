import React, { useContext } from 'react'
import './singleFrnd.css'
import FriendPic from '../FriendPic/FriendPic'
import ChatContext from '../../Contexts/chatContext'

const SingleFrnd = ({frnds}) => {

  const { currentChat, openConvo } = useContext(ChatContext)

  const active = currentChat == null ? false :  currentChat.frnd[0].num == frnds[0].num
  
  return (
    <div 
      className={ active ? 'singleFrnd' : 'inactive'} 
      onClick={()=> openConvo(frnds) }
    >
      <FriendPic {...frnds}/>
      <div className='name'>
        {frnds && frnds[0] && frnds[0].name}
      </div>
    </div>
  )
}

export default SingleFrnd
