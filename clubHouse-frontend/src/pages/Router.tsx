import * as React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Login} from "./Login";
import {Home} from "./Home";
import {NotFound} from "./NotFound";
import {SignUp} from "./SignUp";
import Routes from "./routes";
import {Room} from "./Room";
import {Chat} from "./Chat";
import {Redirect} from 'react-router-dom';
import {useAppSelector} from "../hooks";

export const Router: React.FC = () => {
    const isAuth = useAppSelector(state => state.loginForm.isAuth);
    const isSignUp = useAppSelector(state => state.signUpForm.isSignUp);

    return (
        <BrowserRouter>
            <React.Suspense fallback={<div/>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path={Routes.LOGIN}
                           component={() => (!isAuth) ? <Login/> : <Redirect to={Routes.CHAT}/>}/>
                    <Route exact path={Routes.SIGNUP}
                           component={() => (!isSignUp) ? <SignUp/> : <Redirect to={Routes.LOGIN}/>}/>
                    <Route exact path={Routes.ENTERROOM} component={Room}/>
                    <Route exact path={Routes.CHAT} component={Chat}/>
                    {/*<Route exact path='/longpulling' component={LongPulling}/>*/}
                    <Route component={NotFound}/>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    )
}