import React from "react";
import {
    Modal,
    ListGroup,
    Button
} from "react-bootstrap";

const AddToGroceryListModal = ({
    show,
    handleClose,
    groceryLists,
    onSelectList,
    onCreateNewList
}) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>
                    Add ingredients to grocery list
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <ListGroup>

                    {groceryLists.map(list => (

                        <ListGroup.Item
                            key={list._id}
                            action
                            onClick={() => {

                                onSelectList(list._id);

                                handleClose();
                            }}
                        >
                            {list.title}
                        </ListGroup.Item>

                    ))}

                </ListGroup>

                <br />
                    <p className="text-center font-weight-bold">OR</p>
                <Button
                    variant="dark"
                    block
                    onClick={onCreateNewList}
                >
                    Add to New Grocery List
                </Button>

            </Modal.Body>

        </Modal>
    );
};

export default AddToGroceryListModal;