import * as React from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import {Navbar} from "../components/Navbar/Navbar";

export const SignUp: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <SignUpForm/>
        </div>
    );
}