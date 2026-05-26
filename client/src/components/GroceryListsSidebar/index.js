import React from "react";
import {
    Modal,
    ListGroup,
    Dropdown,
    Button
} from 'react-bootstrap';

import { Link } from "react-router-dom";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import '../../index.css';

const GroceryListsSidebar = ({
    show,
    handleClose,
    groceryLists,
    activeListId,
    onDeleteList
}) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="sidebar-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Your Grocery Lists
                </Modal.Title>
            </Modal.Header>

            <Modal.Body 
                className="p-0"
                style={{
                    maxHeight:'60vh',
                    overflowY: 'auto',
                    scrollBehavior: 'smooth'
                }}
            >

                <ListGroup variant="flush">
                    {groceryLists?.map((list) => (
                        <ListGroup.Item
                            key={list._id}
                            className="d-flex justify-content-between align-items-center py-3"
                            active={list._id === activeListId}
                        >
                            <Link
                                to={`/groceryList/${list._id}`}
                                className={`text-decoration-none font-weight-medium ${list._id === activeListId
                                    ? 'text-white'
                                    : 'text-dark'
                                }`}
                                onClick={handleClose}
                            >
                                {list.title}
                            </Link>

                            <Dropdown alignRight>
                                <Dropdown.Toggle
                                    as={Button}
                                    variant="light"
                                    className="border-0 shadow-none"
                                >
                                    <ThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to={`/groceryList/${list._id}`}
                                        onClick={handleClose}
                                    >
                                        View
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className="text-danger"
                                        onClick={() => onDeleteList(list._id)}
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>

        </Modal>
    )
};

export default GroceryListsSidebar;