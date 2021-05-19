import * as React from 'react';
import {NavbarAuth} from "../components/Navbar/NavbarAuth";
import LongPolling from "../components/LongPolling/LongPolling";

export const LongPollingChat: React.FC = () => {

    return (
        <div>
            <NavbarAuth/>
            <LongPolling/>
        </div>
    );
}