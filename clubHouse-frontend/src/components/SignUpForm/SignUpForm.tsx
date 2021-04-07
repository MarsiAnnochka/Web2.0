import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Form, Button, Col} from "react-bootstrap";
import {enterCity, enterFirstName, enterLastName, enterLogin, enterPassword, enterEmail, signUpUser} from './@slice';

const SignUpForm: React.FC = () => {
    const login = useAppSelector(state => state.signUpForm.login);
    const password = useAppSelector(state => state.signUpForm.password);
    const firstName = useAppSelector(state => state.signUpForm.firstName);
    const lastName = useAppSelector(state => state.signUpForm.lastName);
    const email = useAppSelector(state => state.signUpForm.email);
    const city = useAppSelector(state => state.signUpForm.city);
    const status = useAppSelector(state => state.signUpForm.loading)
    //<div>{status}</div>
    const dispatch = useAppDispatch();

    return (
        <div className="container-fluid w-25 my-5">
            <h3 className="font-weight-bold text-center ">Welcome to Clubhouse!</h3>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridLogin">
                        <Form.Label>Login:</Form.Label>
                        <Form.Control
                            id="username"
                            placeholder="Login"
                            onChange={(event) => dispatch(enterLogin(event.target.value))}
                            value={login}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            id="password"
                            placeholder="Password"
                            onChange={(event) => dispatch(enterPassword(event.target.value))}
                            value={password}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group controlId="formGridFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            id="firstName"
                            placeholder="Your First Name"
                            onChange={(event) => dispatch(enterFirstName(event.target.value))}
                            value={firstName}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            id="lastName"
                            placeholder="Your Last Name"
                            onChange={(event) => dispatch(enterLastName(event.target.value))}
                            value={lastName}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridLastName">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            id="email"
                            placeholder="Email"
                            onChange={(event) => dispatch(enterEmail(event.target.value))}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            id="city"
                            placeholder="City"
                            onChange={(event) => dispatch(enterCity(event.target.value))}
                            value={city}
                        />
                    </Form.Group>

                </Form.Row>

                <Button className="color-primary" type="submit"
                        onClick={() => dispatch(signUpUser({login, password, firstName, lastName, email, city}))}>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm;