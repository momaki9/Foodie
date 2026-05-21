import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeDetails from "../components/Recipe";
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_RECIPE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "../index.css";

const RecipePage = () => {

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saveRecipe] = useMutation(SAVE_RECIPE);
    const { data } = useQuery(QUERY_ME, {
        skip: !Auth.loggedIn()
    });

    const [saved, setSaved] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const user = data?.me;

    console.log(user)

    const getRecipe = async () => {
        let recipeURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOON_API_KEY}`;

        try {
            const response = await fetch(recipeURL);
            const data = await response.json();

            setRecipe(data);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecipe();
    }, [id]);

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
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-dark"
                            className="rounded-pill"
                        >
                            <FaShoppingCart className="me-2" />
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
                            <FaHeart className="me-2" />
                            {saved ? "Saved!" : "Save"}
                        </Button>
                    </div>
                }
            />
        </div>
    )
}

export default RecipePage;