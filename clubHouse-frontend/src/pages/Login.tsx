import * as React from 'react';
import LoginForm from "../components/LoginForm/LoginForm";
import {Navbar} from "../components/Navbar/Navbar";

export const Login: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <LoginForm/>
        </div>
    );
}