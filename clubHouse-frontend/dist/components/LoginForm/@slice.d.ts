import { PayloadAction } from '@reduxjs/toolkit';
export interface Form {
    login: string;
    password: string;
}
export interface LoginFormState {
    login: string;
    password: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
export interface Response {
    type: string;
    message: {
        token: string;
    };
}
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<Response, Form, {}>;
export declare const loginFormSlice: import("@reduxjs/toolkit").Slice<LoginFormState, {
    enterLogin: (state: import("immer/dist/internal").WritableDraft<LoginFormState>, action: PayloadAction<string>) => void;
    enterPassword: (state: import("immer/dist/internal").WritableDraft<LoginFormState>, action: PayloadAction<string>) => void;
}, "login">;
export declare const enterLogin: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterPassword: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>;
declare const _default: import("@reduxjs/toolkit").Reducer<LoginFormState, import("@reduxjs/toolkit").AnyAction>;
export default _default;
