import { createContext, useContext, useEffect } from "react"
import useLocalStorage from "../Hooks/useLocalStorage"
import userContext from "./userContext"
import sha256 from 'js-sha256'


const ChatContext = createContext()
export default ChatContext

export const ChatContextProvider = ({ children }) => {
    const { user, setNewUser, socket } = useContext(userContext)

    const [active, setActive] = useLocalStorage({ key: `active-${user.num}`, initialValue: true })
    const [currentChat, setCurrentChat] = useLocalStorage({ key: `currentChat-${user.num}`, initialValue: null })
    const [friends, setFriends] = useLocalStorage({ key: `friends-${user.num}`, initialValue: [] })
    const [groups, setGroups] = useLocalStorage({ key: `groups-${user.num}`, initialValue: [] })
    const [allconvo, setAllconvo] = useLocalStorage({ key: `allconvos-${user.num}`, initialValue: [] })


    const toggleActive = () => {
        setActive(prev => !prev)
        setCurrentChat(null)
    }

    const addFriend = (num, name) => {
        setFriends(prev => {
            if (!prev.find(one => one.num == num)) {
                const convoKey = generateKey([user, { num, name }])

                console.log(convoKey)

                setAllconvo((prev) => [...prev, { convoKey, data: [] }])
                return [...prev, [{ name, num }]]
            }
        })
    }

    const addGroup = (frnds, grpName) => {
        setGroups(prev => {
            const temp = frnds.map(one => one[0])
            if (prev.includes(temp)) {
                return prev
            } else {
                const convoKey = generateKey([user, ...temp])
                setAllconvo(prev => [...prev, { convoKey, data: [] }])

                temp.unshift({ name: grpName, num: "" })
                return [...prev, temp]
            }
        })
    }

    const logOut = () => {
        setCurrentChat(() => {
            setActive(()=>{
                setNewUser("", "")
                return true
            })
            return null
        })
    }

    console.log("allconvo", allconvo)
    console.log("frnnds", friends)
    useEffect(() => {

        const handleGetMsg = ({ user: sender, frnds, msg }) => {

            const convoKey = generateKey([sender, ...frnds])

            setAllconvo(prev => {

                const found = prev.findIndex(one => one.convoKey == convoKey)

                console.log(found)

                if (found !== -1) {
                    return prev.map(one => {
                        if (one.convoKey == convoKey) {
                            return ({
                                ...one,
                                data: [...one.data, { user: sender.num, msg, ...formatDateAndTime(Date.now()) }]
                            })
                        }
                        return one
                    })
                }
                else {
                    const grp = frnds.filter(one => one.num !== user.num)

                    const newConvo = {
                        convoKey,
                        data: [{ user: sender.num, msg, ...formatDateAndTime(Date.now()) }]
                    }

                    if (frnds.length > 2) {
                        setGroups(prevGrps => {
                            const newGrp = [...grp, sender]
                            console.log(newGrp)
                            if (prevGrps && prevGrps.includes(newGrp)) return prevGrps
                            else return [...prevGrps, newGrp]
                        })
                    } else {
                        console.log(sender)

                        setFriends(old => [...old, [sender]])
                    }

                    return [...prev, newConvo]
                }
            })

        }
        socket.on("getMsg", handleGetMsg)


        return () => {
            socket.off("getMsg", handleGetMsg)
        }
    }, [socket])

    const sendMsg = (frnds, msg) => {

        socket.emit("sendMsg", { user, frnds, msg })

        setAllconvo(prev => {
            const convoKey = generateKey([user, ...frnds])

            return prev.map(one => {
                if (one.convoKey === convoKey) {

                    const newData = one.data
                    newData.push({ 
                        user: user.num,
                        msg,
                        ...formatDateAndTime(Date.now())
                    })
                    return { ...one, data: newData }
                }
                return one
            })
        })

    }

    const openConvo = (frnds) => {

        const convoKey = generateKey([user, ...frnds])

        setCurrentChat({ frnd: frnds, convoKey })
    }

    const values = {
        currentChat, openConvo,
        socket, friends, addFriend,
        sendMsg, setAllconvo, logOut, active, toggleActive,
        groups, addGroup, allconvo
    }

    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    )
}


const generateKey = (multiUsers) => {

    const sortedNums = multiUsers.map(one => one.num).sort((a, b) => a - b)
    const concatNums = sortedNums.join("")

    const hash = sha256.create()
    hash.update(concatNums)

    return hash.hex()
}

const formatDateAndTime = (msgDate) => {
    const date = new Date(msgDate)
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`
    
    return { date: formattedDate, time: formattedTime }
}
