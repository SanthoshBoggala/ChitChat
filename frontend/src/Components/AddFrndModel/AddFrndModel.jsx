import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './addFrndModel.css'
import ChatContext from '../../Contexts/chatContext';

const AddFriendModal = ({ show, handleClose }) => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const { addFriend } = useContext(ChatContext)

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddButtonClick = () => {
        addFriend(number, name)
        setNumber('');
        setName('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}centered >
            <Modal.Header closeButton>
                <Modal.Title>Add Friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter number" value={number} onChange={handleNumberChange} />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddButtonClick}>
                    Add Friend
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFriendModal;
