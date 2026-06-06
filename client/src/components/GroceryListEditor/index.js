import React, { useState } from "react";
import {
    Card,
    Form,
    Button,
    InputGroup,
    ListGroup
} from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";

const GroceryListEditor = ({
    items,
    setItems,
    onToggleItem,
    onAddItem,
    onDeleteItem,
    editable = true
}) => {
    const [newItem, setNewItem] = useState("");

    const handleAddItem = () => {
        if (!newItem.trim()) return;

        const item = {
            value: newItem.trim(),
            checked: false
        };

        onAddItem(item);
        setNewItem("");
    };

    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            handleAddItem();
        }
    };

    return (
        <Card className="shadow-sm border-0 rounded-lg">
            <Card.Body className="p-0">

                <ListGroup variant="flush">
                    {items.map((item, index) => (
                        <ListGroup.Item
                            key={item._id}
                            className="d-flex align-items-center justify-content-between py-3 px-4"
                        >
                            <Form.Check
                                type="checkbox"
                                id={item._id}
                                checked={item.checked}
                                onChange={() => onToggleItem(item._id)}
                                label={
                                    <span
                                        className={`ml-2 ${item.checked ? 'text-muted' : ''}`}
                                        style={{
                                            textDecoration: item.checked
                                                ? 'line-through'
                                                : 'none',
                                            fontSize: '1.15rem'
                                        }}
                                    >
                                        {item.value}
                                    </span>
                                }
                            />
                        <Button
                            variant="link"
                            className="p-0 text-danger"
                            onClick={() => onDeleteItem(item._id)}
                        >
                            <FaTrash />
                        </Button>
                        </ListGroup.Item>
                    ))}

                </ListGroup>

                {editable && (
                    <div className="p-3 border-top bg-light">
                        <InputGroup>
                            <Form.Control
                                placeholder="Add item..."
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="dark"
                                    onClick={handleAddItem}
                                >
                                    Add
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default GroceryListEditor;