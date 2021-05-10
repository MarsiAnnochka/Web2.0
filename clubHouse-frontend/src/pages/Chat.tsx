import * as React from 'react';
import ChatForm from "../components/ChatForm/ChatForm";
import {Navbar} from "../components/Navbar/Navbar";
import {useAppSelector} from "../hooks";
import LoginForm from "../components/LoginForm/LoginForm";

export const Chat: React.FC = () => {
    const isAuth = useAppSelector(state => state.loginForm.isAuth);

    return (
        <div>
            <Navbar/>
            {isAuth ? <ChatForm/> : <LoginForm/>}
        </div>
    );
}