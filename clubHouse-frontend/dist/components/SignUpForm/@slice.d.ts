import { PayloadAction } from '@reduxjs/toolkit';
export interface Form {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
}
export interface SignUpFormState {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
export interface Response {
    type: string;
    message: {
        token: string;
    };
}
export declare const signUpUser: import("@reduxjs/toolkit").AsyncThunk<Response, Form, {}>;
export declare const SignUpFormSlice: import("@reduxjs/toolkit").Slice<SignUpFormState, {
    enterLogin: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
    enterPassword: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
    enterFirstName: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
    enterLastName: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
    enterEmail: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
    enterCity: (state: import("immer/dist/internal").WritableDraft<SignUpFormState>, action: PayloadAction<string>) => void;
}, "signup">;
export declare const enterLogin: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterPassword: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterFirstName: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterLastName: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterEmail: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>, enterCity: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>;
declare const _default: import("@reduxjs/toolkit").Reducer<SignUpFormState, import("@reduxjs/toolkit").AnyAction>;
export default _default;
