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
                <h1 className='text-center brand mb-3'>Chit Chat </h1>
                <h3 className='text-center brandDown mb-2'>Login/Register</h3>
                <div>Name: </div>
                <input 
                    name='name'
                    placeholder='Name...'
                    ref={nameRef}
                />
                <div>Mobile Number: </div>
                <input 
                    name='phone'
                    placeholder='Mobile number...'
                    ref={numRef}
                /> <br />
                <div
                    className="loginBtn"
                >
                    <button 
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
