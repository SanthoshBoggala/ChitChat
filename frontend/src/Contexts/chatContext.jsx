import { createContext, useContext, useEffect, useState } from "react"
import useLocalStorage from "../Hooks/useLocalStorage"
import userContext from "./userContext"



const ChatContext = createContext()
export default ChatContext

export const ChatContextProvider = ({ children })=>{
    const { user, setNewUser, socket } = useContext(userContext)

    const [currentChat, setCurrentChat] = useState(null)
    const friendsLocalStorageKey = user ? `friends-${user.num}` : "friends"
    const [friends, setFriends] = useLocalStorage({ key: friendsLocalStorageKey, initialValue: []})
    const [allconvo, setAllconvo] = useLocalStorage({ key: `${'allconvos'+user.num}` , initialValue: [] })

    const addFriend = (num, name) => {
        setFriends(prev =>{
            if(!prev.find(one => one.num == num)){
                const convoKey = `${user.num}-${num}`
                setAllconvo((prev) => [...prev, { convoKey, data: [] }])
                return [...prev, { name, num }]
            }
        })
    }

    const logOut = () =>{
        const key = "chitChat-user"
        localStorage.removeItem(key)

        setNewUser("", "")
        setCurrentChat(null)
        setFriends([])
        setAllconvo([])
    }

    useEffect(()=>{
        socket.on("getMsg", (frnd, user, msg)=>{

            setAllconvo(prev => {
                const convoKey = `${user.num}-${frnd.num}`

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
        console.log(frnd, msg, user)

        socket.emit("sendMsg",user, frnd, msg)
        setAllconvo(prev => {
            const convoKey = `${user.num}-${frnd.num}`
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

    const values = {currentChat, openConvo,
             socket, friends, addFriend,
             sendMsg, setAllconvo, logOut }

    return(
        <ChatContext.Provider value={ values }>
            { children }
        </ChatContext.Provider>
    )
}