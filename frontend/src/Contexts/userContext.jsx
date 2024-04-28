import useLocalStorage from "../Hooks/useLocalStorage";
import { createContext, useEffect } from "react";
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

const UserContext = createContext()

export default UserContext
let firstTime = 0

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage({ key: "user", initialValue: null })

    useEffect(()=>{
        if(user != null && firstTime == 0){
            firstTime++
            socket.emit("newUser", "login", { pass: user.pass, name: user.name})
        }

        socket.on("getNewUser", (data)=>{
            console.log("user...", data)
            setUser(data)
        })

        return () =>{ 
            socket.off("getNewUser")
        }
    }, [])
    
    const setNewUser = (flag, myUser) =>{
        console.log(myUser)
        if(flag == "login"){
            socket.emit("newUser", "login", myUser)
            return
        }

        socket.emit("newUser", "register", myUser)
    }

    return (
        <UserContext.Provider value={{user, setNewUser, socket, setUser}}>
            { children }
        </UserContext.Provider>
    )
}