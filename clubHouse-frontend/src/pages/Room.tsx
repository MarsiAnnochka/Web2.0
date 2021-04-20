import * as React from 'react';
import {Navbar} from "../components/Navbar/Navbar";
import RoomForm from "../components/RoomForm/RoomForm";

export const Room: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <RoomForm/>
        </div>
    );
}