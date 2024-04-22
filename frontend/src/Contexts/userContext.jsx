import useLocalStorage from "../Hooks/useLocalStorage";
import { createContext, useEffect } from "react";
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

const UserContext = createContext()

export default UserContext

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage({ key: "user", initialValue: null })

    useEffect(()=>{
        socket.emit("user", user)
    }, [])
    
    const setNewUser = (name, num) =>{
        if(name == "" && num == ""){
            setUser(null)
        }
        else{
            const u = { name, num}
            setUser(u)
            socket.emit("user", u)
        }
    }

    return (
        <UserContext.Provider value={{user, setNewUser, socket}}>
            { children }
        </UserContext.Provider>
    )
}