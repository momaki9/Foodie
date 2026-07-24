import React, { useState, useRef, useLayoutEffect } from "react";
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
    onUpdateItem,
    editable = true
}) => {
    const [newItem, setNewItem] = useState("");
    const textareaRefs = useRef({})

    useLayoutEffect(() => {
        Object.values(textareaRefs.current).forEach((textarea) => {
            if (!textarea) return;

            textarea.style.height = "0px";
            textarea.style.height = `${textarea.scrollHeight}px`;
        })
    }, [items])

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

    const handleItemChange = (itemId, value) => {
        setItems(prev =>
            prev.map(item =>
                item._id === itemId
                    ? {
                        ...item,
                        value
                    }
                    : item
            )
        );
    };

    return (
        <Card className="shadow-sm border-0 rounded-lg">
            <Card.Body className="p-0">

                <ListGroup variant="flush">
                    {items.map((item) => (
                        <ListGroup.Item
                            key={item._id}
                            className="d-flex align-items-start py-3 px-4"
                        >
                            <div className="d-flex align-items-start flex-grow-1">
                                <Form.Check
                                    type="checkbox"
                                    id={item._id}
                                    checked={item.checked}
                                    onChange={() => onToggleItem(item._id)}
                                />

                                <Form.Control
                                    ref={(el) => {
                                        if (el) {
                                            textareaRefs.current[item._id] = el;
                                        } else {
                                            delete textareaRefs.current[item._id]
                                        }
                                    }}
                                    as={"textarea"}
                                    rows={1}
                                    value={item.value}
                                    onInput={(e) => {
                                        e.target.style.height = "0px";
                                        e.target.style.height = `${e.target.scrollHeight}px`
                                    }}
                                    onChange={(e) => handleItemChange(item._id, e.target.value)}
                                    onBlur={() => onUpdateItem?.(item._id, item.value)}
                                    className={`ml-2 ${item.checked ? 'text-muted' : ''}`}
                                    id="grocery-item"
                                    style={{
                                        textDecoration: item.checked
                                            ? 'line-through'
                                            : 'none'
                                    }}
                                />
                            </div>
                            <Button
                                variant="link"
                                className="p-0 ml-2 text-danger flex-shrink-0"
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