import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const SignupPage = ({setLoggedIn}) => {
    const [validated, setValidated] = useState(false);
    const [formState, setFormState] = useState({ username: "", email: "", password: "" });
    const [signup, { error, data }] = useMutation(SIGN_UP);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(formState);

        const form = event.currentTarget;

        setValidated(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }


        try {
            const { data } = await signup({
                variables: { ...formState }
            });

            Auth.login(data.signup.token);

            setFormState({
                username: "",
                password: "",
                email: ""
            });

            setValidated(false);
            setLoggedIn(true);
            navigate("/", { replace: true });

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container className='d-flex justify-content-center mt-5'>
            <Card
                className='p-4 shadow-sm'
                style={{ width: '100%', maxWidth: '540px' }}
            >
                <h3 className='text-center mb-4'>Sign up</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* username */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                aria-describedby='inputGroupPrepend'
                                required
                                minLength={3}
                                name='username'
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type='invalid'>Provide a valid username.</Form.Control.Feedback>
                        </InputGroup>

                    </Form.Group>
                    {/* email */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Email address</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                required
                                name='email'
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type='invalid'>Provide a valid email.</Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    {/* password */}
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword6"
                            aria-describedby="passwordHelpInline"
                            required
                            minLength={8}
                            name='password'
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type='invalid'>Provide a valid password.</Form.Control.Feedback>
                        <Form.Text id="passwordHelpInline" muted>
                            Must be 8-20 characters long.
                        </Form.Text>
                    </Form.Group>
                    <Button type='submit' className='w-100'>Submit</Button>
                </Form>
            </Card>
        </Container>
    )
};

export default SignupPage;