import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_GROCERY_LIST } from "../utils/mutations";
import GroceryListHeader from "../components/GroceryListHeader";
import GroceryListEditor from "../components/GroceryListEditor";
import { Container, Button } from "react-bootstrap";

const NewGroceryList = () => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);
    const [createGroceryList] = useMutation(CREATE_GROCERY_LIST);

    const navigate = useNavigate();

    const handleAddItem = (item) => {
        const newItem = {
            _id: `temp-${Date.now()}`,
            value: item.value || item,
            checked: false
        };
        setItems(prevItems => [
            ...prevItems,
            newItem
        ]);
    };

    const handleToggleItem = (itemId) => {
        const updatedItems = items.map(item => {
            if (item._id !== itemId) {
                return item;
            }
            return {
                ...item,
                checked: !item.checked
            };
        });
        setItems(updatedItems);
    }

    const handleCreateList = async () => {

        if (!title.trim()) return;

        const cleanItems = items.map(({value, checked}) => (
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
                }
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
            />
            <div className="text-right mt-4">
                <Button 
                    onClick={handleCreateList}
                    disabled={!title.trim()}
                >
                    Create list
                </Button>
            </div>
        </Container>
    )
}

export default NewGroceryList;