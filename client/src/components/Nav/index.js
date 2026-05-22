import React, { useState } from "react";
import Auth from "../../utils/auth";
import {
    Nav,
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    NavDropdown
} from 'react-bootstrap';
import { Search, PersonCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import '../../index.css';
import { useApolloClient } from '@apollo/client';

function NavComp({ loggedIn, setLoggedIn }) {

    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        Auth.logout();
        setLoggedIn(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchInput.trim()) return;

        navigate(`/search?q=${searchInput}`);

        setSearchInput("");
    }

    return (
        <Navbar
            bg="white"
            expand="lg"
            className="shadow-sm py-3 border-bottom mb-5"
            sticky="top"
        >
            <Container>

                {/* BRAND / LOGO */}
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="font-weight-bold"
                    style={{
                        fontSize: "1.5rem",
                        letterSpacing: "1px"
                    }}
                >
                    Foodie
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">

                    {/* LEFT NAV LINKS */}
                    <Nav className="mr-auto ml-4 align-items-center">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/explore">
                            Explore
                        </Nav.Link>

                        {loggedIn && (
                            <>
                                <Nav.Link as={Link} to="/add">
                                    Add Recipe
                                </Nav.Link>

                                <Nav.Link as={Link} to="/list">
                                    Grocery List
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    {/* SEARCH BAR */}
                    <Form
                        inline
                        onSubmit={handleSearch}
                        className="mx-lg-3 my-2 my-lg-0"
                    >
                        <div
                            className="d-flex align-items-center px-3"
                            style={{
                                background: "#f5f5f5",
                                borderRadius: "50px",
                                height: "42px"
                            }}
                        >
                            <Search className="mr-2 text-muted" />

                            <FormControl
                                type="text"
                                placeholder="Search recipes..."
                                className="border-0 bg-transparent shadow-none"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </Form>

                    {/* RIGHT SIDE */}
                    <Nav className="align-items-center">

                        {!loggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>

                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="dark"
                                    className="ml-2 rounded-pill px-4"
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <NavDropdown
                                title={
                                    <span>
                                        <PersonCircle size={22} className="mr-1" />
                                        Profile
                                    </span>
                                }
                                id="profile-dropdown"
                                alignRight
                            >
                                <NavDropdown.Item as={Link} to="/profile">
                                    My Profile
                                </NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/saved">
                                    Saved Recipes
                                </NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/my-recipes">
                                    My Recipes
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavComp;
