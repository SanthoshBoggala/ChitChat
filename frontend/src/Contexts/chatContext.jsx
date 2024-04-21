import { createContext, useEffect, useState } from "react"
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const ChatContext = createContext()
export default ChatContext

export const ChatContextProvider = ({ children })=>{
    const [user, setUser] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [friends, setFriends] = useState([])
    const [allconvo, setAllconvo] = useState([])

    const addFriend = (num, name) => {
        setFriends(prev =>{
            if(!prev.find(one => one.num == num)){
                const convoKey = `${user.num}-${num}`
                setAllconvo((prev) => [...prev, { convoKey, data: [] }])
                return [...prev, { name, num }]
            }
        })
    }

    console.log(allconvo)

    useEffect(()=>{
        socket.on("getMsg", (frnd, user, msg)=>{
            console.log("server", frnd, user, msg)

            setAllconvo(prev => {
                const convoKey = `${user.num}-${frnd.num}`
                console.log("con", convoKey)
                return prev.map(one => {
                    if(one.convoKey === convoKey){
                        
                        const newData = one.data
                        newData.push({ user: frnd.num, msg })
                        return {...one, data: newData}
                    }
                    return one
                })
            })
        })
    }, [])

    const sendMsg = (frnd, msg)=>{
        socket.emit("sendMsg",user, frnd, msg)
        setAllconvo(prev => {
            const convoKey = `${user.num}-${frnd.num}`
            console.log(convoKey, frnd)
            return prev.map(one => {
                if(one.convoKey === convoKey){
                    
                    const newData = one.data
                    newData.push({ user: user.num, msg })
                    return {...one, data: newData}
                }
                return one
            })
        })
    }

    const openConvo = (frnd)=>{
        const convoKey = `${user.num}-${frnd.num}`
        setCurrentChat({frnd, chat: allconvo.find(one => one.convoKey === convoKey)})
    }

    const values = {currentChat, openConvo, setUser,
             user, socket, friends, addFriend,
             sendMsg, setAllconvo }

    return(
        <ChatContext.Provider value={ values }>
            { children }
        </ChatContext.Provider>
    )
}