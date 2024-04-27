import React, { useContext } from 'react'
import './singleMsg.css'
import OwnUser from './OwnUser'
import OtherUser from './OtherUser'
import UserContext from '../../Contexts/userContext'

const SingleMsg = ({msg, user, date, time, oldMsg}) => {

    const { user: ownUser } = useContext(UserContext)

    return (
        <>
            {ownUser.num == user ? <OwnUser msg={msg} date={date} time={time} oldMsg={oldMsg} user={user} /> : <OtherUser  msg={msg} date={date} time={time} oldMsg={oldMsg} user={user} />}
        </>
    )
}

export default SingleMsg
