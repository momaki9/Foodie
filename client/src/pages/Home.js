import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me;

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 text-muted">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #eef2f7 100%)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card
              className="border-0 shadow-lg"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <Card.Body className="p-5 text-center">
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #343a40, #495057)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || "👋"}
                </div>

                <h1
                  className="font-weight-bold mb-3"
                  style={{
                    fontSize: "3rem",
                    color: "#212529",
                  }}
                >
                  {user
                    ? `Welcome back, ${user.username}!`
                    : "Welcome!"}
                </h1>

                <p
                  className="text-muted mx-auto mb-4"
                  style={{
                    maxWidth: "600px",
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                  }}
                >
                  Discover recipes, save your favorites, build grocery
                  lists, and explore new meals all in one beautifully
                  organized place.
                </p>

                <div
                  className="d-inline-block px-4 py-2"
                  style={{
                    background: "#f1f3f5",
                    borderRadius: "999px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  🚀 Something awesome is coming soon
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;