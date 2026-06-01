import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GROCERY_LIST } from "../utils/mutations";
import GroceryListHeader from "../components/GroceryListHeader";
import GroceryListEditor from "../components/GroceryListEditor";
import { Container, Button } from "react-bootstrap";
import { MY_GROCERY_LISTS } from "../utils/queries";

const NewGroceryList = () => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);
    const [createGroceryList] = useMutation(CREATE_GROCERY_LIST);

    const navigate = useNavigate();

    const handleAddItem = (item) => {
        const newItem = {
            _id: crypto.randomUUID(),
            value: item.value || item,
            checked: false
        };
        setItems(prevItems => [
            ...prevItems,
            newItem
        ]);
    };

    const handleDeleteItem = async (itemId) => {
        setItems(prev => prev.filter(item => item._id !== itemId))
    };

    const handleToggleItem = (itemId) => {
        setItems(prev => prev.map(item =>
            item._id === itemId
                ? {...item, checked: !item.checked}
                : item
        ));
    };

    const handleCreateList = async () => {

        if (!title.trim()) return;

        const cleanItems = items.map(({ value, checked }) => (
            {
                value,
                checked
            }
        ));

        try {
            const { data } = await createGroceryList({
                variables: {
                    listData: {
                        title,
                        items: cleanItems
                    }
                },
                refetchQueries: [
                    {
                        query: MY_GROCERY_LISTS
                    }
                ]
            });

            navigate(`/groceryList/${data.createGroceryList._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container fluid="md">
            <GroceryListHeader
                title={title}
                setTitle={setTitle}
                isNew
            />
            <GroceryListEditor
                items={items}
                setItems={setItems}
                onToggleItem={handleToggleItem}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
            />
            <div className="text-right mt-4">
                <Button
                    onClick={handleCreateList}
                    disabled={!title.trim() || items.length === 0}
                >
                    Create list
                </Button>
            </div>
        </Container>
    )
}

export default NewGroceryList;