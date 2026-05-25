import React from "react";
import {
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'react-bootstrap-icons';
import "../../index.css";

const GroceryListHeader = ({
    title,
    setTitle,
    onOpenSidebar
}) => {
    return (
        <Row className="align-items-center mb-4">
            <Col xs="auto">
                <Button
                    variant="light"
                    className="border"
                    onClick={onOpenSidebar}
                >
                    <ArrowLeft size={18} /> 
                    All grocery lists
                </Button>
            </Col>
            <Col>
                <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Grocery List"
                    className="text-center font-weight-bold"
                    style={{
                        fontSize: '1.5rem',
                        backgroundColor: 'transparent',
                        border: "none",
                        boxShadow: 'none'
                    }}
                />
            </Col>
            <Col xs='auto'>
                    <Button
                        as={Link}
                        to='/groceryList/new'
                        variant="dark"
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: '44px',
                            height: '44px'
                        }}
                    >
                        <Plus size={22} />
                    </Button>
            </Col>
        </Row>
    )
};

export default GroceryListHeader;