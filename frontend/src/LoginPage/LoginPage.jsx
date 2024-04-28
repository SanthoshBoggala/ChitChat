import React, { useContext, useEffect, useRef, useState } from 'react'
import './loginPage.css'
import UserContext from '../Contexts/userContext'

const LoginPage = () => {
    const [login, setLogin] = useState(false)
    const [err, setErr] = useState("")
    const passRef = useRef()
    const confirmPassRef = useRef()
    const nameRef = useRef()
    const numRef = useRef()


    const { setNewUser, Socket } = useContext(UserContext)

    useEffect(()=>{
        Socket.on("registerDone", ()=>{
            setLogin(true)
        })

        return ()=>{
            socket.off("registerDone")
        }
    }, [])
    const submitUser = (e) => {
        e.preventDefault()

        if (login) {
            loginNow()
            return
        }
        registerNow()
    }

    const loginNow = () => {
        if (nameRef.current.value.length < 3) {
            setErr("Name must be min length of 4")
            return
        }
        if (passRef.current.value.length < 5) {
            setErr("Password must be min of 5")
            return
        }

        setNewUser("login", {
            name: nameRef.current.value,
            pass: passRef.current.value
        })

    }
    const registerNow = () => {
        if (nameRef.current.value.length < 3) {
            setErr("Name must be min length of 4")
            return
        }
        // if(passRef.current.value.length < 5){
        //     setErr("Password must be min of 5")
        //     return
        // }
        if (passRef.current.value != confirmPassRef.current.value) {
            setErr("Passwords must be same")
            return
        }
        // if(numRef.current.value.length != 10){
        //     setErr("Mobile number must be valid")
        //     return
        // }

        const newUser = {
            name: nameRef.current.value,
            num: numRef.current.value,
            pass: passRef.current.value
        }

        setNewUser("register", newUser)

    }
    return (
        <div className='loginPage'>
            <form onSubmit={submitUser} className='loginDiv'>
                <h1 className='text-center brand mb-3'>Chit Chat </h1>
                <h3 className='text-center brandDown mb-2'>{login ? "Login" : "Register"}</h3>
                <div>Name: </div>
                <input
                    name='name'
                    placeholder='Name...'
                    ref={nameRef}
                />
                {!login && (
                    <>
                        <div>Mobile Number: </div>
                        <input
                            name='phone'
                            placeholder='Mobile number...'
                            ref={numRef}
                        />
                    </>
                )}
                <div>Password: </div>
                <input
                    name='password'
                    placeholder='password...'
                    ref={passRef}
                />

                {!login && (
                    <>
                        <div>Confirm Password: </div>
                        <input
                            name='confirmpassword'
                            placeholder='confirm password...'
                            ref={confirmPassRef}
                        />
                    </>
                )
                }
                <br />
                <div
                    className="loginBtn"
                >
                    <button
                    >
                        {!login ? "Register Now" : "Login"}
                    </button>
                </div>
                <div className='text-danger text-center'>{err}</div>
                {login ? (
                    <div className='loginRegisterDiv'>
                        New to Chit Chat?
                        <span className='loginSpan'
                            onClick={() => setLogin(false)}
                        >Register Now...</span>
                    </div>
                ) : (
                    <div className='loginRegisterDiv'>
                        Already a user?
                        <span className='loginSpan'
                            onClick={() => setLogin(true)}
                        >Login Now...</span>
                    </div>
                )}
            </form>
        </div>
    )
}

export default LoginPage
