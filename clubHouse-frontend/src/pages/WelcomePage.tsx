import * as React from 'react';
import {NavbarAuth} from "../components/Navbar/NavbarAuth";
import {WelcomePage} from "../components/WelcomePage/WelcomePage";

export const Welcome: React.FC = () => {
    return (
        <div>
            <NavbarAuth/>
            <WelcomePage/>
        </div>
    );
}