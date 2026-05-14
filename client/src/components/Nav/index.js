import React from "react";
import Auth from "../../utils/auth";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import '../../index.css';

function NavComp() {

    function showNavigation() {
        console.log(Auth.loggedIn())
        if (Auth.loggedIn()) {
            return (
                <>
                    <Nav.Item>
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="#">Explore</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="/add">Add Recipes</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="/list">Grocery List</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" onClick={() => Auth.logout()}>Logout</Link>
                    </Nav.Item>
                </>
            )
        } else {
            return (
                <>
                    <Nav.Item>
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="#">Explore</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="/login">Login</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </Nav.Item>
                </>
            )
        }
    }
    return (
        <Nav className="justify-content-center" activeKey="/">
            {showNavigation()}
        </Nav>
    )
}

export default NavComp;
