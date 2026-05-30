import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import {
    Spinner,
    Row,
    Col,
    Container
} from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";

const MyRecipesPage = () => {

    const { data, loading } = useQuery(QUERY_ME);
    const myName = data?.me.username || "A FOODIE";
    const myRecipes = data?.me.createdRecipes || [];

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="dark" />
                <p className="mt-3 text-muted">
                    Loading your recipes...
                </p>
            </div>
        );
    };

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">My Recipes</h1>
                <p className="text-muted">
                    All your created recipes in one place!
                </p>
            </div>
            {myRecipes.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>No created recipes yet.</h4>
                    <p className="text-muted">
                        Create your own recipes to see them here.
                    </p>
                </div>
            ) : (
                <Row className="justify-content-center">
                    {myRecipes.map((myRecipe) => (
                        <Col
                            key={myRecipe._id}
                            xs={12}
                            sm={6}
                            lg={4}
                            xl={3}
                            className="d-flex"
                        >
                            <RecipeCard
                                id={myRecipe._id}
                                imgLink={myRecipe.image}
                                title={myRecipe.title}
                                name={myName}
                                to={`/myRecipes/${myRecipe._id}`}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
};

export default MyRecipesPage;