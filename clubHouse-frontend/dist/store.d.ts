/// <reference types="connected-react-router" />
export declare const history: import("history").BrowserHistory<object>;
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    router: import("connected-react-router").RouterState<object>;
    loginForm: import("./components/LoginForm/@slice").LoginFormState;
    signUpForm: import("./components/SignUpForm/@slice").SignUpFormState;
    room: import("./components/Room/@slice").RoomState;
}, import("@reduxjs/toolkit").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<import("@reduxjs/toolkit").Middleware<{}, any, import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction>> | import("redux-thunk").ThunkMiddleware<any, import("@reduxjs/toolkit").AnyAction, null> | import("redux-thunk").ThunkMiddleware<any, import("@reduxjs/toolkit").AnyAction, undefined>>>;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
