import * as React from 'react';
import ChatForm from "../components/ChatForm/ChatForm";
import {Navbar} from "../components/Navbar/Navbar";

export const Chat: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <ChatForm/>
        </div>
    );
}