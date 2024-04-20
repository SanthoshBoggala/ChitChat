import React from 'react'
import './newMsg.css'

const NewMsg = () => {
  return (
    <div className='newMsg row g-0 bg-success'>
       <div className='col-1 fileAttachment'>
        KK
       </div>
       <div className='col-10 inputMsg'>
            <input 
                name='newMsg'
            />
       </div>
       <div className='col-1 sendMsg'>
        <button>
            send
        </button>
       </div>
    </div>
  )
}

export default NewMsg
