import React, { useContext, useRef } from 'react'
import './loginPage.css'
import ChatContext from '../Contexts/chatContext'

const LoginPage = () => {
    const { socket } = useContext(ChatContext)
    const nameRef = useRef()
    const numRef = useRef()

    const { setUser } = useContext(ChatContext)

    const submitUser = (e)=>{
        e.preventDefault()

        if(nameRef.current.value !== "" && numRef.current.value !== ""){
            const u = { name: nameRef.current.value, num: numRef.current.value }
            setUser(u)
            socket.emit("user", u)
        }
    }
    return (
        <div className='loginPage'>
            <form onSubmit={submitUser} className='loginDiv'>
                <h3 className='text-center mb-3'>Login/Register</h3>
                <div>Name: </div>
                <input 
                    name='name'
                    placeholder='Name...'
                    ref={nameRef}
                    className='my-3'
                />
                <div>Mobile Number: </div>
                <input 
                    name='phone'
                    placeholder='Mobile number...'
                    ref={numRef}
                    className='my-3'
                /> <br />
                <button 
                    className='btn btn-success'
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
