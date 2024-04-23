import { createContext, useContext, useEffect, useState } from "react"
import useLocalStorage from "../Hooks/useLocalStorage"
import userContext from "./userContext"



const ChatContext = createContext()
export default ChatContext

export const ChatContextProvider = ({ children })=>{
    const { user, setNewUser, socket } = useContext(userContext)

    const [active, setActive] = useLocalStorage({ key: `active-${user.num}`, initialValue: true })
    const [currentChat, setCurrentChat] = useLocalStorage({ key: `currentChat-${user.num}`, initialValue: null })
    const [friends, setFriends] = useLocalStorage({ key: `friends-${user.num}`, initialValue: []})
    const [groups, setGroups] = useLocalStorage({ key: `groups-${user.num}`, initialValue: []})
    const [allconvo, setAllconvo] = useLocalStorage({ key: `allconvos-${user.num}` , initialValue: [] })


    const toggleActive = ()=>{
        setActive(prev => !prev)
        setCurrentChat(null)
    }

    const addFriend = (num, name) => {
        setFriends(prev =>{
            if(!prev.find(one => one.num == num)){
                const convoKey = `${user.num}-${num}`
                setAllconvo((prev) => [...prev, { convoKey, data: [] }])
                return [...prev, [{ name, num }]]
            }
        })
    }

    const addGroup = (frnds, grpName) =>{
        setGroups(prev => {
            const temp = frnds.map(one => one[0])
            if(prev.includes(temp)){
                return prev
            } else {
                const key = temp.map(one => one.num).join("")
                const convoKey = `${user.num}-${key}`
                setAllconvo(prev => [...prev,  { convoKey, data: [] } ])

                temp.unshift({name: grpName, num: ""})
                return [...prev, temp]
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

        const handleGetMsg =  (frnd, user, msg)=>{
            console.log(frnd, user, msg)
            const key = user.map(one => one.num).join("")

            setAllconvo(prev => {
                const convoKey = `${key}-${frnd.num}`

                return prev.map(one => {
                    if(one.convoKey === convoKey){
                        
                        const newData = one.data
                        newData.push({ user: frnd.num, msg })
                        return {...one, data: newData}
                    }
                    return one
                })
            })
        }
        socket.on("getMsg", handleGetMsg)

        return ()=>{
            socket.off("getMsg", handleGetMsg)
        }
    }, [socket])

    const sendMsg = (frnds, msg)=>{
        
        socket.emit("sendMsg",user, frnds, msg)

        setAllconvo(prev => {
            const key = frnds.map(one => one.num).join("")
            const convoKey = `${user.num}-${key}`
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

    const openConvo = (frnds)=>{
        const key = frnds.map( one => one.num ).join("")

        const convoKey = `${user.num}-${key}`
        const chats = allconvo.find(one => one.convoKey === convoKey)
        setCurrentChat({frnd: frnds, chat: chats ? chats : [] })
    }

    const values = {currentChat, openConvo,
             socket, friends, addFriend,
             sendMsg, setAllconvo, logOut, active, toggleActive,
             groups, addGroup }

    return(
        <ChatContext.Provider value={ values }>
            { children }
        </ChatContext.Provider>
    )
}