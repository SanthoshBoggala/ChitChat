import React from 'react'
import './chatWindow.css'
import FriendPic from '../FriendPic/FriendPic'
import SingleMsg from '../SingleMsg/SingleMsg'
import NewMsg from '../NewMsg/NewMsg'

const ChatWindow = () => {

    const user = {
        name: 'santhosh',
        pic: "",
    }
    const msgs = [
        {
          user: "santhosh",
          msg: "Hi there!",
        },
        {
          user: "hh",
          msg: "Hey, how are you?",
        },
        {
            user: "santhosh",
            msg: "Hru?",
          },
      ];
      

    return (
        <div className='chatWindow'>
            <div className='chatWindowTop'>
                <FriendPic {...user} />
                <div className='name mx-3'>{user.name}</div>
            </div>
            <div className='chattingBox'>
                { msgs && msgs.length !== 0 && (
                    msgs.map(one => <SingleMsg {...one}/>)
                ) }
            </div>
            <NewMsg />
        </div>
    )
}

export default ChatWindow
