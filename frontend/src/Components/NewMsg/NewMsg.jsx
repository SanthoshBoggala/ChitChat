import React, { useContext, useState } from 'react'
import './newMsg.css'
import ChatContext from '../../Contexts/chatContext'

const NewMsg = ({frnds}) => {
    const [newMsg, setNewMsg] = useState("")
    const { sendMsg} = useContext(ChatContext)

    const sendMsgTo = ()=>{
        sendMsg(frnds, newMsg)
        setNewMsg("")
    }

    return (
        <div className='newMsg row g-0'>
            <div className='col-1 fileAttachment'>
                K
            </div>
            <div className='col-10 inputMsg'>
                <input
                    name='newMsg'
                    value={newMsg}
                    placeholder='send a message...'
                    onChange={(e)=> setNewMsg(e.target.value)}
                />
            </div>
            <div className='col-1 sendMsg'>
                <button
                    onClick={sendMsgTo}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default NewMsg
