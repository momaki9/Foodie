import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import { FaTrash } from "react-icons/fa";
import "../index.css";

const GroceryListPage = () => {

    const [groceryList, setGroceryList] = useState(
        {
            title: "",
            items: [
                {
                    id: crypto.randomUUID(),
                    value: "",
                    checked: false
                }
            ]
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroceryList((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addItem = () => {
        setGroceryList((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    id: crypto.randomUUID(),
                    value: "",
                    checked: false
                }
            ]
        }));
    };

    const deleteItem = (id) => {
        setGroceryList((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id)
        }));
    };

    const updateItem = (id, value) => {
        setGroceryList((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id ? { ...item, value } : item
            )
        }));
    };

    const toggleChecked = (id) => {
        setGroceryList((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const groceryListData = {
            title: groceryList.title,
            items: groceryList.items.map((item) => item.value.trim()).filter(Boolean)
        };

        console.log(groceryListData);
    };

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card style={{ width: "100%", maxWidth: "550px"}} className="p-3 shadow-sm">
                <h3 className="text-center mb-3">Grocery List</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='title'
                                type="text"
                                placeholder="Give your grocery list a title"
                                value={groceryList.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    {groceryList.items.map((item) => (
                        <Form.Row key={item.id}>
                            <Col xs="auto">
                                <div className="circle-wrapper" onClick={() => toggleChecked(item.id)}>
                                    <div className={item.checked ? "circle checked" : "circle"}/>
                                </div>
                                {/* <Form.Check
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleChecked(item.id)}
                                /> */}
                            </Col>
                            <Form.Group as={Col}>
                                <Form.Control
                                    id="grocery-input"
                                    value={item.value}
                                    onChange={(e) => updateItem(item.id, e.target.value)}
                                    style={{ textDecoration: item.checked ? "line-through" : "none" }}
                                />
                            </Form.Group>
                            <Col xs="auto">
                                <Button
                                    variant="link"
                                    className="p-0 text-danger"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Form.Row>
                    ))}
                    <div className="add-btn">
                        <Button type='button' onClick={addItem} variant="dark">Add</Button>
                    </div>
                    <div>
                        <Button type="submit" block>Save</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default GroceryListPage;