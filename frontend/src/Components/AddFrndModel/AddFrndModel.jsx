import React, { useContext, useRef, useState } from 'react';
import { Modal, Button, Form , ListGroup, FormControl} from 'react-bootstrap';
import './addFrndModel.css'
import ChatContext from '../../Contexts/chatContext';

const AddFriendModal = ({ show, handleClose }) => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    const groupRef = useRef()
    const [selectedFriends, setSelectedFriends] = useState([]);
    const { friends, addFriend, addGroup, groups, active } = useContext(ChatContext)

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddButtonClick = () => {
        if(active){
            if(number.length !== 0 && name.length !== 0 ){
                addFriend(number, name)

                setNumber('');
                setName('');
                handleClose();
            }
        }
        else{
            const name = groupRef.current.value
            if(selectedFriends.length < 2 || name.length == 0){
                if(groups.filter(one => one.name == name)){
                    console.log("group already present")
                }
                return
            }

            addGroup(selectedFriends, name)

            setNumber('');
            setName('');
            handleClose();
        }
    };

    const handleFriendCheckboxChange = (friend) => {
        const isSelected = selectedFriends.includes(friend);
        if (isSelected) {
            setSelectedFriends(selectedFriends.filter((selectedFriend) => selectedFriend !== friend));
        } else {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };

    const renderFriendsList = () => {
        return (
            <>
                <FormControl className='search' type="text" placeholder="Search friends" />
                <div className='frndsList'>
                    {friends.map((friend, index) => (
                        <div
                            key={index}
                            className='checkboxDiv'
                        >
                            <input
                                type="checkbox"
                                id={`friend-checkbox-${index}`}
                                onChange={() => handleFriendCheckboxChange(friend)}
                            />
                            <span>{friend[0].name}</span>
                        </div>
                    ))}
                </div>
                <FormControl className='search' type="text" placeholder="Group Name" ref={groupRef}/>
            </>
        );
    };    

    return (
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton>
                <Modal.Title>Add Friend</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center">
                <Form>
                    {active ? (
                        <>
                            <Form.Group controlId="formNumber">
                                <Form.Label>Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter number" value={number} onChange={handleNumberChange} />
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                            </Form.Group>
                        </>
                    ) : (
                        renderFriendsList()
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button className='addOne' onClick={handleAddButtonClick}>
                    Add {active ? "Friend" : "Group"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFriendModal;
