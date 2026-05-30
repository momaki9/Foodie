import React from "react";
import {
    Modal,
    Button
} from 'react-bootstrap';

const SimpleDeleteModal = ({
    show,
    handleClose,
    handleDelete,
    title,
    bodyMessage
}) => {

    return (
        <Modal
            dialogClassName="rounded-4"
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-0 text-muted">
                    {bodyMessage}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    className="px-4"
                    onClick={handleDelete}
                >
                    Yes, remove.
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={handleClose}
                >
                    No, cancel.
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SimpleDeleteModal;