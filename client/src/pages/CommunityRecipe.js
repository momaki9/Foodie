import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

import {
    GET_A_RECIPE_BY_ID,
    QUERY_ME,
    MY_GROCERY_LISTS
} from "../utils/queries";

import {
    ADD_ITEMS_TO_GROCERY_LIST,
    SAVE_RECIPE,
    CREATE_GROCERY_LIST
} from '../utils/mutations';

import RecipeDetails from "../components/Recipe";
import AddToGroceryListModal from "../components/AddToGroceryListModal";
import { FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";
import Auth from "../utils/auth";
import { ingredientHelper } from "../utils/helpers";

const CommunityRecipe = () => {
    const { id } = useParams();
    const [showAddToListModal, setShowAddToListModal] = useState(false);
    const [saved, setSaved] = useState(false);
    const { loading, data } = useQuery(GET_A_RECIPE_BY_ID, {
        variables: {
            id: id
        }
    });
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const { loading: listLoading, data: listData } = useQuery(MY_GROCERY_LISTS);
    const [addItemsToGroceryList] = useMutation(ADD_ITEMS_TO_GROCERY_LIST);
    const [createGroceryList] = useMutation(CREATE_GROCERY_LIST);
    const [saveRecipe] = useMutation(SAVE_RECIPE);

    const me = meData?.me;
    const recipeData = data?.getARecipeById || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!me || !Auth.loggedIn()) return;

        const alreadySaved = me.savedRecipes?.some(
            (savedRecipe) => savedRecipe._id === id
        );

        setSaved(alreadySaved);
    }, [me, id])

    const handleSaveRecipe = async () => {

        if (saved) return;
        if (!recipeData._id) return;

        try {
            const { data } = await saveRecipe({
                variables: {
                    savedRecipeData: {
                        sourceId: recipeData._id.toString(),
                        title: recipeData.title,
                        image: recipeData.image,
                        source: "local"
                    }
                },
                refetchQueries: [{
                    query: QUERY_ME
                }]
            });

            setSaved(true);

        } catch (err) {
            console.error(err)
        }
    }

    const handleAddIngredientsToGroceryList = async (listId) => {

        const ingredientNames = ingredientHelper(recipeData.ingredients, "local");
        
        try {
            await addItemsToGroceryList({
                variables: {
                    listId: listId,
                    items: ingredientNames
                }
            });
            setShowAddToListModal(false);
        } catch (err) {
            console.error(err)
        }
    };

    const handleCreatingNewGroceryList = async () => {
        const groceryItems = recipeData.ingredients.map(
            ingredient => ({
                value: ingredient.name,
                checked: false
            })
        );
        try {
            const { data } = await createGroceryList({
                variables: {
                    listData: {
                        title: recipeData.title,
                        items: groceryItems
                    }
                },
                refetchQueries: [
                    {
                        query: MY_GROCERY_LISTS
                    }
                ]
            });
            setShowAddToListModal(false);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <h1>Loading...</h1>
    };

    return (
        <div className="recipe-page-container">
            <Button variant="light" className="rounded-circle mb-3 shadow-sm" onClick={() => navigate(-1)}> <FaArrowLeft /> </Button>
            <RecipeDetails
                id={recipeData._id}
                title={recipeData.title}
                image={recipeData.image}
                sourceName={recipeData.author?.username}
                summary={recipeData.summary}
                extendedIngredients={recipeData.ingredients}
                instructions={recipeData.instructions}
                actions={
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Button
                            variant="outline-dark"
                            disabled={!Auth.loggedIn()}
                            className="rounded-pill"
                            style={{margin: "4px"}}
                            onClick={() => setShowAddToListModal(true)}
                        >
                            <FaShoppingCart className="me-2" style={{marginRight: "6px"}}/>
                            Add to Grocery List
                        </Button>
                        <Button
                            variant="outline-danger"
                            disabled={!Auth.loggedIn()}
                            className="rounded-pill"
                            style={{margin: "4px"}}
                            onClick={() => {
                                handleSaveRecipe();
                            }}
                        >
                            <FaHeart className="me-2" />
                            {saved ? " Saved!" : " Save"}
                        </Button>
                    </div>
                }
            />
            {/* only if logged in */}
            <AddToGroceryListModal
                show={showAddToListModal}
                handleClose={() => setShowAddToListModal(false)}
                groceryLists={listData?.myGroceryLists || []}
                onSelectList={handleAddIngredientsToGroceryList}
                onCreateNewList={handleCreatingNewGroceryList}
            />
        </div>
    )
}

export default CommunityRecipe;