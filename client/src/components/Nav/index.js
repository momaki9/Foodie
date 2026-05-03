import React from "react";
import Auth from "../../utils/auth";
import Nav from 'react-bootstrap/Nav';


function NavComp() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Explore</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Add Recipes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Grocery List</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Logout</Nav.Link>
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
