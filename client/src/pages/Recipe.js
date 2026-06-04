import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeDetails from "../components/Recipe";
import AddToGroceryListModal from "../components/AddToGroceryListModal";
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";

import { SAVE_RECIPE, ADD_ITEMS_TO_GROCERY_LIST, CREATE_GROCERY_LIST } from "../utils/mutations";
import { QUERY_ME, GET_RECIPE_BY_ID, MY_GROCERY_LISTS } from "../utils/queries";
import Auth from "../utils/auth";
import { ingredientHelper } from "../utils/helpers";
import "../index.css";

const Recipe = () => {
    const { id } = useParams();
    const [showAddToListModal, setShowAddToListModal] = useState(false);
    const { loading, data: recipeData, error } = useQuery(GET_RECIPE_BY_ID, {
        variables: { id: parseInt(id) }
    });
    const [saveRecipe] = useMutation(SAVE_RECIPE);
    const [addItemsToGroceryList] = useMutation(ADD_ITEMS_TO_GROCERY_LIST);
    const [createGroceryList] = useMutation(CREATE_GROCERY_LIST);
    const { data } = useQuery(QUERY_ME, {
        skip: !Auth.loggedIn()
    });

    const {
        loading: myListsLoading,
        data: myListsData,
        error: myListsError
    } = useQuery(MY_GROCERY_LISTS);

    const [saved, setSaved] = useState(false);

    const navigate = useNavigate();
    const user = data?.me;
    const recipe = recipeData?.getRecipeById;

    useEffect(() => {
        if (!user || !Auth.loggedIn()) return;

        const alreadySaved = user.savedRecipes.some(
            (savedRecipe) => savedRecipe.sourceId === id
        );

        setSaved(alreadySaved);
    }, [user, id])

    if (loading) {
        return <h1>Loading...</h1>
    };

    if (!recipe) {
        return <h1>Recipe not found!</h1>
    };

    const handleAddIngredientsToGroceryList = async (listId) => {
        const ingredientNames = ingredientHelper(recipe.extendedIngredients, "spoonacular");
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

    const handleCreatingNewGroceryList = async ({title, items}) => {
        const groceryItems = recipe.extendedIngredients.map(
            ingredient => ({
                value: ingredient.name,
                checked: false
            })
        );
        try {
            const { data } = await createGroceryList({
                variables: {
                    listData: {
                        title: recipe.title,
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

    const handleSaveRecipe = async () => {

        if (saved) return;

        try {
            const { data } = await saveRecipe({
                variables: {
                    savedRecipeData: {
                        sourceId: recipe.id.toString(),
                        title: recipe.title,
                        image: recipe.image,
                        source: "spoonacular"
                    }
                }
            });

            setSaved(true);

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="recipe-page-container">
            <Button variant="light" className="rounded-circle mb-3 shadow-sm" onClick={() => navigate(-1)}> <FaArrowLeft /> </Button>
            <RecipeDetails
                id={id}
                title={recipe.title}
                image={recipe.image}
                servings={recipe.servings}
                readyInMinutes={recipe.readyInMinutes}
                cookingMinutes={recipe.cookingMinutes}
                sourceName={recipe.sourceName}
                summary={recipe.summary}
                extendedIngredients={recipe.extendedIngredients}
                instructions={recipe.instructions}
                spoonacularSourceUrl={recipe.spoonacularSourceUrl}
                actions={
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Button
                            variant="outline-dark"
                            disabled={!Auth.loggedIn()}
                            className="rounded-pill"
                            onClick={() => setShowAddToListModal(true)}
                        >
                            <FaShoppingCart className="me-2"/>
                            Grocery List
                        </Button>
                        <Button
                            variant="outline-danger"
                            disabled={!Auth.loggedIn()}
                            className="rounded-pill"
                            onClick={() => {
                                handleSaveRecipe();
                            }}
                        >
                            <FaHeart className="me-2"/>
                            {saved ? " Saved!" : " Save"}
                        </Button>
                    </div>
                }
            />
            <AddToGroceryListModal
                show={showAddToListModal}
                handleClose={() => setShowAddToListModal(false)}
                groceryLists={myListsData?.myGroceryLists || []}
                onSelectList={handleAddIngredientsToGroceryList}
                onCreateNewList={handleCreatingNewGroceryList}
            />
        </div>
    )
}

export default Recipe;