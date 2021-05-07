import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {enterLogin, enterPassword, loginUser} from './@slice';
import {useEffect} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import {defaultState} from './@slice';
import {Form, Button} from "react-bootstrap";

const LoginForm: React.FC = () => {
    const login = useAppSelector(state => state.loginForm.login);
    const password = useAppSelector(state => state.loginForm.password);
    const isAuth = useAppSelector(state => state.loginForm.isAuth);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (isAuth) {
            dispatch(defaultState());
            history.push('/');
        }
    }, [isAuth]);

    const submit = () => {
        dispatch(loginUser({login, password}))
        if (!isAuth) {
        } else {
            return <Redirect to={'/chat'}/>
        }
    }

    return (
        <div className="container-fluid w-25 my-5">
            <h3 className="font-weight-bold text-center ">Sign in!</h3>
            <Form>
                <Form.Group controlId="formBasicLogin">
                    <Form.Label>Login:</Form.Label>
                    <Form.Control
                        id="username"
                        placeholder="Login"
                        onChange={(event) => dispatch(enterLogin(event.target.value))}
                        value={login}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        id="password"
                        placeholder="Password"
                        onChange={(event) => dispatch(enterPassword(event.target.value))}
                        value={password}
                    />
                </Form.Group>

                <Button className="btn-secondary"
                        onClick={submit}>
                    Enter Room
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;