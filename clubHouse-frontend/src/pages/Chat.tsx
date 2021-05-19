import * as React from 'react';
import ChatForm from "../components/ChatForm/ChatForm";
import {NavbarAuth} from "../components/Navbar/NavbarAuth";

export const Chat: React.FC = () => {

    return (
        <div>
            <NavbarAuth/>
            <ChatForm/>
        </div>
    );
}