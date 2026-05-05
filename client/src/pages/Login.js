import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

    const [formState, setFormState ] = useState({ username: '', password: ''});
    const [login, { error, data} ] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
        
        setFormState({
            email: '', password: ''
        });
    }


    return (
        <div>
            <h2>Login:</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' value={formState.username} type="text" placeholder="Enter username" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' value={formState.password} type="password" placeholder="********" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;