import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Login} from "./Login";
import {Home} from "./Home";
import {NotFound} from "./NotFound";
import {SignUp} from "./SignUp";
import Routes from "./routes";
import {Room} from "./Room";
import {Chat} from "./Chat";

export const Router: React.FC = () => {
    return(
        <BrowserRouter>
            <React.Suspense fallback={<div/>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path={Routes.LOGIN} component={Login}/>
                    <Route exact path={Routes.SIGNUP} component={SignUp}/>
                    <Route exact path={Routes.ENTERROOM} component={Room}/>
                    <Route exact path='/chat' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    )
}