import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_RECIPE_BY_ID, QUERY_ME } from "../utils/queries";
import { DELETE_RECIPE } from "../utils/mutations";
import {
    Spinner,
    Button
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import RecipeDetails from "../components/Recipe";
import SimpleDeleteModal from "../components/SimpleDeleteModal";

const MyRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const { loading, data, error } = useQuery(GET_MY_RECIPE_BY_ID, {
        variables: {
            id: id
        }
    });

    const {
        loading: meLoading,
        data: meData,
        error: meError
    } = useQuery(QUERY_ME);

    const [deleteRecipe] = useMutation(DELETE_RECIPE);

    const myRecipe = data?.getMyRecipeById || {};
    const username = meData?.me.username || "FOODIE";

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe({
                variables: {
                    recipeId: id
                },
                refetchQueries: [QUERY_ME]
            });
            setShowModal(false);
            navigate('/myRecipes');

        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '80vh' }}
            >
                <div className="text-center">
                    <Spinner animation="border" variant="dark" />
                    <p className="mt-3 text-muted">Loading your recipe...</p>
                </div>
            </div>
        )
    };

    return (
        <div className="recipe-page-container">
            <Button
                variant="light"
                className="rounded-circle mb-3 shadow-sm"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft />
            </Button>
            <RecipeDetails
                id={myRecipe._id}
                title={myRecipe.title}
                image={myRecipe.image}
                instructions={myRecipe.instructions}
                summary={myRecipe.summary}
                extendedIngredients={myRecipe.ingredients}
                sourceName={username}
                actions={
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-primary"
                            onClick={() => navigate(`/myRecipes/edit/${myRecipe._id}`)}
                        >
                            Edit Recipe
                        </Button>

                        <Button
                            variant="outline-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                        >
                            Delete Recipe
                        </Button>
                    </div>
                }
            />
            <SimpleDeleteModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleDelete={handleDeleteRecipe}
                title={"Remove a Created Recipe"}
                bodyMessage={"Are you sure you want to delete this recipe?"}
            />
        </div>
    )
}

export default MyRecipe;