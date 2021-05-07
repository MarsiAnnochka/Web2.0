import * as React from 'react';
import LoginForm from "../components/LoginForm/LoginForm";
import {Navbar} from "../components/Navbar/Navbar";
import {useAppSelector} from "../hooks";
import ChatForm from "../components/ChatForm/ChatForm";

export const Login: React.FC = () => {
    const isAuth = useAppSelector(state => state.loginForm.isAuth);

    return (
        <div>
            <Navbar/>
            <LoginForm/>
        </div>
    );
}