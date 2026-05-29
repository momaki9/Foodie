import React from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

import {
    Container,
    Row,
    Col,
    Spinner
} from "react-bootstrap";

import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me.savedRecipes || [];

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        )
    }

    return (
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
                <Row>
                    {userData.map((savedRecipe) => (
                        <Col
                            key={savedRecipe.sourceId}
                            xs={12}
                            sm={6}
                            lg={4}
                            xl={3}
                            className="d-flex"
                        >
                            <RecipeCard
                                id={savedRecipe.sourceId}
                                imgLink={savedRecipe.image}
                                title={savedRecipe.title}
                                name={savedRecipe.source}
                                source={savedRecipe.source}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
};

export default SavedRecipesPage;

{/* <h1>Your saved recipes here: </h1>
            {userData.map((savedRecipe) => (
                <RecipeCard
                    id={savedRecipe.sourceId}
                    imgLink={savedRecipe.image}
                    title={savedRecipe.title}
                    name={savedRecipe.source}
                    source={savedRecipe.source}
                />
            ))} */}