import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useQuery } from "@apollo/client";
import { SEARCH_RECIPES } from "../utils/queries";
import { Spinner } from "react-bootstrap";

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q");
    const navigate = useNavigate();

    const { loading, data, error } = useQuery(SEARCH_RECIPES, {
        variables: {term: searchTerm}
    });

    const results = data?.searchRecipes;

    if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 text-muted">Loading your results...</p>
        </div>
      </div>
    );
  };

    return (
        <section>
            <h1 className="text-center mb-4">Results:</h1>
            {results.map((recipe) => (
                <RecipeCard
                    id={recipe.id} 
                    imgLink={recipe.image}
                    title={recipe.title}
                    name={recipe.sourceName}
                    score={recipe.spoonacularScore}
                    likes={recipe.aggregateLikes}
                />
            ))}
        </section>
    )
};

export default SearchResults;