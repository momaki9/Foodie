import React, { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_SAVED_RECIPE } from "../utils/mutations";

import {
    Container,
    Row,
    Col,
    Spinner
} from "react-bootstrap";

import RecipeCard from "../components/RecipeCard";
import SimpleDeleteModal from "../components/SimpleDeleteModal";

import { FaTimes } from "react-icons/fa";

const SavedRecipesPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const { loading, data } = useQuery(QUERY_ME);
    const [removedSavedRecipe] = useMutation(REMOVE_SAVED_RECIPE);
    const userData = data?.me.savedRecipes || [];

    const handleDeleteSavedRecipe = async (sourceId) => {
        try {
            await removedSavedRecipe({
                variables: {
                    sourceId: selectedRecipeId
                },
                refetchQueries: [QUERY_ME]
            });
            setShowModal(false);
            setSelectedRecipeId(null);
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        )
    }

    return (
        <>
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold">Saved Recipes</h1>
                    <p className="text-muted">
                        All your favorite recipes in one place!
                    </p>
                </div>
                {userData.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>No saved recipes yet.</h4>
                        <p className="text-muted">
                            Start saving recipes to see them here.
                        </p>
                    </div>
                ) : (
                    <Row className="justify-content-center">
                        {userData.map((savedRecipe) => (
                            <Col
                                key={savedRecipe.sourceId}
                                xs={12}
                                sm={6}
                                lg={4}
                                xl={3}
                                className="d-flex"
                            >
                                <div className="position-relative w-100">
                                    <button
                                        className="btn btn-danger rounded-circle position-absolute d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '34px',
                                            height: '34px',
                                            top: "-8px",
                                            right: '-8px',
                                            zIndex: 10,
                                            padding: 0
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSelectedRecipeId(savedRecipe.sourceId);
                                            setShowModal(true);
                                        }}
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                    <RecipeCard
                                        id={savedRecipe.sourceId}
                                        imgLink={savedRecipe.image}
                                        title={savedRecipe.title}
                                        name={savedRecipe.source}
                                        source={savedRecipe.source}
                                        to={
                                            savedRecipe.source == "spoonacular"
                                                ? `/explore/${savedRecipe.sourceId}`
                                                : `/community-recipes/${savedRecipe.sourceId}`
                                        }
                                    />
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <SimpleDeleteModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleDelete={handleDeleteSavedRecipe}
                title={"Remove a Saved Recipe"}
                bodyMessage={"Are you sure you want to remove this recipe?"}
            />
        </>
    )
};

export default SavedRecipesPage;