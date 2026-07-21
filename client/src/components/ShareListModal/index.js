import React, { useState } from "react";
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

const ShareListModal = ({
    show,
    handleClose,
    onShare
}) => {

    const [username, setUsername] = useState("");

    const handleSubmit = async () => {
        if (!username.trim()) return;
        try {
            await onShare(username.trim());
            setUsername("");
        } catch (error) {
            console.error(error)
        }
    };

    const handleCancel = () => {
        setUsername("");
        handleClose();
    }


    return (
        <Modal
            dialogClassName="rounded-4"
            show={show}
            onHide={handleCancel}
            centered
        >
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Share this list to a foodie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter the foodie's username</Form.Label>
                        <Form.Control
                            autoFocus
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        className="px-4"
                        type="submit"
                        disabled={!username.trim()}
                    >
                        Share
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ShareListModal;