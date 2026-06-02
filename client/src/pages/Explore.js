import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { useInView } from 'react-intersection-observer';
import { useQuery } from "@apollo/client";
import { GET_RECIPES } from "../utils/queries";
import { Container, Row, Col } from "react-bootstrap";

const Explore = () => {

  const [visibleCount, setVisibleCount] = useState(25);
  const { ref, inView } = useInView();
  const { loading, data, error } = useQuery(GET_RECIPES);
  // const [recipes, setRecipes] = useState([]);

  const recipes = data?.getRecipes || [];

  useEffect(() => {
    if (inView && visibleCount < recipes.length) {
      setVisibleCount((prev) => prev + 25)
    }
  }, [inView, visibleCount, recipes.length]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <section>
      <h1 className="text-center mb-4">Discover new Foodies</h1>
      <Container>
        <Row>
          {recipes.slice(0, visibleCount).map((recipe) => (
            <Col
              key={recipe.id}
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              className="d-flex mb-4"
            >
              <RecipeCard
                id={recipe.id}
                imgLink={recipe.image}
                title={recipe.title}
                name={recipe.sourceName}
                score={recipe.spoonacularScore}
                likes={recipe.aggregateLikes}
                to={`/explore/${recipe.id}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
      {visibleCount < recipes.length && (
        <div ref={ref} className="text-center py-4">
          Loading more recipes...
        </div>
      )}
    </section>
  )
}

export default Explore;