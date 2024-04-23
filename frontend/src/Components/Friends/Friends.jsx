import React, { useContext, useState } from 'react'
import './friends.css'
import SingleFrnd from '../SingleFrnd/SingleFrnd'
import AddFriendModal from '../AddFrndModel/AddFrndModel'
import ChatContext from '../../Contexts/chatContext'


const Friends = () => {
    const [showModal, setShowModal] = useState(false);
    const { friends, groups, active } = useContext(ChatContext)


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {active ? (
                (friends && friends.length !== 0) ? (
                    friends.map((one, index) => <SingleFrnd key={index} frnds={one} />)
                ) : (
                    <div className='mt-5'>
                        <h4>No Friends!</h4>
                    </div>
                )
            ) : (
                (groups && groups.length !== 0) ? (
                    groups.map((one, index) => <SingleFrnd key={index} frnds={one} />)
                ) : (
                    <div className='mt-5'>
                        <h4>No groups!</h4>
                    </div>
                )
            )}


            <div className='addFriend'>
                <div onClick={handleShowModal}>
                    <div>+</div>
                </div>
                <AddFriendModal
                    show={showModal}
                    handleClose={handleCloseModal}
                />
            </div>
        </>
    )
}

export default Friends
