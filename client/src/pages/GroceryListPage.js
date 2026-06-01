import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { MY_GROCERY_LISTS, GET_GROCERY_LIST } from "../utils/queries";
import {
    TOGGLE_GROCERY_ITEM,
    ADD_GROCERY_ITEM,
    SET_ACTIVE_GROCERY_LIST,
    DELETE_GROCERY_LIST,
    DELETE_GROCERY_ITEM
} from "../utils/mutations";
import { useParams, useNavigate } from "react-router-dom";

import GroceryListHeader from "../components/GroceryListHeader";
import GroceryListEditor from "../components/GroceryListEditor";
import GroceryListsSidebar from "../components/GroceryListsSidebar";

const GroceryListPage = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");

    const { id } = useParams();

    const { loading, data, error } = useQuery(MY_GROCERY_LISTS);
    const {
        loading: groceryListLoading,
        data: groceryListData,
        error: groceryListError
    } = useQuery(GET_GROCERY_LIST, {
        variables: {
            id
        }
    });

    const navigate = useNavigate();

    const [toggleGroceryItem, { error: toggleError }] = useMutation(TOGGLE_GROCERY_ITEM);
    const [addGroceryItem, { error: addItemError }] = useMutation(ADD_GROCERY_ITEM);
    const [setActiveGroceryList] = useMutation(SET_ACTIVE_GROCERY_LIST);
    const [deleteGroceryList] = useMutation(DELETE_GROCERY_LIST);
    const [deleteGroceryItem] = useMutation(DELETE_GROCERY_ITEM);

    const groceryLists = data?.myGroceryLists;
    const groceryList = groceryListData?.getGroceryList;

    useEffect(() => {
        if (groceryList) {
            setItems([...groceryList.items]);
            setTitle(groceryList.title);
        }
    }, [groceryList]);

    useEffect(() => {
        if (!id) return;
        setActiveGroceryList({
            variables: {
                listId: id
            }
        })
    }, [id, setActiveGroceryList]);

    const handleToggleItem = async (itemId) => {
        const previousItems = items.map(item => ({
            ...item
        }));

        const updatedItems = items.map((item) => {
            if (item._id !== itemId) {
                return item;
            }
            return {
                ...item,
                checked: !item.checked
            }
        });

        setItems(updatedItems);
        // apollo cache mutation
        try {
            await toggleGroceryItem({
                variables: {
                    listId: groceryList._id,
                    itemId
                }
            });
        } catch (err) {
            console.error(err);
            setItems(previousItems);
        }
    };

    const handleAddItem = async (item) => {
        const previousItems = items.map(item => ({
            ...item
        }));

        const updatedItems = [...items, item];
        setItems(updatedItems);

        try {
            await addGroceryItem({
                variables: {
                    listId: groceryList._id,
                    item
                }
            });

        } catch (err) {
            console.error(err);
            setItems(previousItems);
        }
    };

    const handleDeleteItem = async (itemId) => {
        const previousItems = [...items];
        const updatedItems = items.filter(item => item._id !== itemId);
        setItems(updatedItems);

        try {
            await deleteGroceryItem({
                variables: {
                    listId: groceryList._id,
                    itemId
                }
            });

        } catch (err) {
            console.error(err);
            setItems(previousItems);
        }
    };

    const handleDeleteList = async (listId) => {
        console.log('delete', listId);
        // TODO: use delete mutation that removes a grocery list from DB and add here
        try {
            await deleteGroceryList({
                variables: {
                    listId: listId
                },
                refetchQueries: [
                    {
                        query: MY_GROCERY_LISTS
                    }
                ]
            });

            navigate("/groceryList")

        } catch (err) {
            console.error(err)
        }
    };

    if (loading || groceryListLoading) {
        return <p>Loading...</p>
    };

    if (error || groceryListError) {
        return <p>Something went wrong...</p>
    };

    return (
        <>
            <GroceryListsSidebar
                show={showSidebar}
                handleClose={() => setShowSidebar(false)}
                groceryLists={groceryLists}
                // should the id be stored in a state variable??
                activeListId={groceryList?._id}
                onDeleteList={handleDeleteList}

            />
            <Container fluid="md" className="">
                <GroceryListHeader
                    title={title}
                    setTitle={setTitle}
                    onOpenSidebar={() => setShowSidebar(true)}
                />
                <GroceryListEditor
                    items={items}
                    setItems={setItems}
                    onToggleItem={handleToggleItem}
                    onAddItem={handleAddItem}
                    onDeleteItem={handleDeleteItem}
                />
            </Container>

        </>
    )
};

export default GroceryListPage;