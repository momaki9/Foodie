import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, ALL_RECIPES, MY_GROCERY_LISTS } from "../utils/queries";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUtensils, FaShoppingCart } from "react-icons/fa";

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [hash])
};

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { loading: allRecipeLoading, data: allRecipeData } = useQuery(ALL_RECIPES);
  const { loading: groceryListLoading, data: groceryListData } = useQuery(MY_GROCERY_LISTS);

  const user = data?.me;
  const communityRecipes = allRecipeData?.allRecipes || [];
  const myGroceryLists = groceryListData?.myGroceryLists || [];

  useScrollToHash();

  if (loading && allRecipeData && groceryListData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  };

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: '100vh'
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #eef2f7 100%)",
          padding: "80px 0"
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={18}>
              <h1
                className="display-4 font-weight-bold mb-3"
              >
                {user
                  ? `Welcome back, ${user.username}!`
                  : "Cook Smarter. Eat Better."
                }
              </h1>
              <p className="lead text-muted mb-4">
                Discover recipes, create your own meals, save favorites, and manage grocery lists all in one place!
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to='/explore'>
                  <Button
                    size="lg"
                    variant="dark"
                  >
                    Explore Recipes
                  </Button>
                </Link>
                <Link to='/#community-recipes'>
                  <Button
                    size="lg"
                    variant="outline-dark"
                  >
                    Community Recipes
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">
                    <FaSearch />
                  </div>
                  <h4>Explore Recipes</h4>
                  <p className="text-muted">
                    Search thousands of recipes powered by Spoonacular
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">
                    <FaUtensils />
                  </div>
                  <h4>Create Recipes</h4>
                  <p className="text-muted">
                    Share your own creations with the community.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">
                    <FaShoppingCart />
                  </div>
                  <h4>Grocery Lists</h4>
                  <p className="text-muted">
                    Organize ingredients and plan your next shopping trip.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container id="community-recipes">
          <h2 className="mb-4 text-center">
            Community Recipes
          </h2>
          <Row>
            {communityRecipes.map((recipe) => (
              <Col
                md={4}
                key={recipe._id}
                className="mb-4"
              >
                <Link to={`/community-recipes/${recipe._id}`} className='recipe-link'>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <h5>{recipe.title}</h5>
                      <p className="text-muted mb-0">
                        by {recipe.author.username}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {user && (
        <section className="py-5">
          <Container>
            <h2 className="mb-4">
              Your Dashboard
            </h2>
            <Row>
              <Col md={4}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5>Saved Recipes</h5>
                    <h2>
                      {user.savedRecipes?.length || 0}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5>Grocery Lists</h5>
                    <h2>
                      {myGroceryLists.length || 0}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5>Your Recipes</h5>
                    <h2>
                      {user.createdRecipes?.length || 0}
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Home;