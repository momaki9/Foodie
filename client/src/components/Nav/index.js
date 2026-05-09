import React from "react";
import Auth from "../../utils/auth";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";


function NavComp() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item>
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/explore">Explore</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/add">Add Recipes</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/list">Grocery List</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="#">Logout</Link>
                    </Nav.Item>
                </Nav>
            )
        } else {
            return (
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Explore</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Signup</Nav.Link>
                    </Nav.Item>
                </Nav>
            )
        }
    }
    return (
        <>
            {showNavigation()}
        </>
    )
}

export default NavComp;
