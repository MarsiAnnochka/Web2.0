import {createBrowserHistory} from "history";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {connectRouter} from "connected-react-router";
import loginFormReducer from './components/LoginForm/@slice';
import signUpFormReducer from './components/SignUpForm/@slice';
import roomReducer from './components/Room/@slice';

export const history = createBrowserHistory();

const middleware = getDefaultMiddleware({thunk: true})

const reducer = {
    router: connectRouter(history),
    loginForm: loginFormReducer,
    signUpForm: signUpFormReducer,
    room: roomReducer
}

export const store = configureStore({
    reducer,
    middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch