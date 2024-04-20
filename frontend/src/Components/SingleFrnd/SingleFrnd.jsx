import React from 'react'
import './singleFrnd.css'
import FriendPic from '../FriendPic/FriendPic'

const SingleFrnd = () => {

  const user = {
    name: 'santhosh',
    pic: "",
  }

  return (
    <div className='singleFrnd'>
      <FriendPic {...user}/>
      <div className='name'>
        {user.name}
      </div>
      <div className='notifi'>
        23
      </div>
    </div>
  )
}

export default SingleFrnd
