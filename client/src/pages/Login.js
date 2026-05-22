import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "../index.css";

function Login({ setLoggedIn }) {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
            setLoggedIn(true);
            navigate('/');
        } catch (err) {
            console.error(err);
        }

        setFormState({
            username: '',
            password: ''
        });
    };

    return (
        <div
            className="py-5"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%)'
            }}
        >
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={11} sm={8} md={6} lg={4}>
                        <Card
                            className="border-0 shadow-lg"
                            style={{
                                borderRadius: '20px'
                            }}
                        >
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h1
                                        className="fw-bold"
                                        style={{
                                            fontSize: '2.2rem',
                                            color: '#2d3748'
                                        }}
                                    >
                                        Welcome Back
                                    </h1>

                                    <p className="text-muted mb-0">
                                        Login to continue
                                    </p>
                                </div>

                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Username
                                        </Form.Label>

                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            name="username"
                                            value={formState.username}
                                            placeholder="Enter username"
                                            onChange={handleChange}
                                            className="rounded-pill px-4"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            Password
                                        </Form.Label>

                                        <Form.Control
                                            size="lg"
                                            type="password"
                                            name="password"
                                            value={formState.password}
                                            placeholder="Enter password"
                                            onChange={handleChange}
                                            className="rounded-pill px-4"
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-100 rounded-pill fw-bold py-2"
                                        style={{
                                            backgroundColor: '#4f46e5',
                                            border: 'none'
                                        }}
                                    >
                                        Login
                                    </Button>

                                    {error && (
                                        <p className="text-danger text-center mt-3 mb-0">
                                            Login failed. Please try again.
                                        </p>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;