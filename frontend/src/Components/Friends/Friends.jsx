import React from 'react'
import './friends.css'
import SingleFrnd from '../SingleFrnd/SingleFrnd'

const Friends = () => {

    const frnds = [0,0,0,0,0,0,0,6,7, 3,45,6,76,8,9,87,7,] 

    return (
        <>
            { (frnds && frnds.length !== 0) ? (
                    frnds.map((one) => <SingleFrnd />)
                ) : ( <></> )}
        </>
    )
}

export default Friends
