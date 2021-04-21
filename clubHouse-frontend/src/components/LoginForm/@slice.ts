import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchData } from '../../utils/API';

export interface Form {
    login: string;
    password: string;
}

export interface LoginFormState {
    login: string;
    password: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export interface Response {
    type: string;
    message: {
        access_token: string;
    }
}

const initialState: LoginFormState = {
    login: '',
    password: '',
    loading: 'idle'
}

export const loginUser = createAsyncThunk(
    'login/auth',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({username: data.login, password: data.password}),
            method: 'POST',
        };
        const response = await fetchData('/api/login/', postOptions);
        return await (response.json()) as Response;
    })

export const loginFormSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        enterLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload
        },
        enterPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    //"builder callback API", для асинхронных операций
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = 'pending'
        })
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.password = '';
                state.login = '';
                localStorage.setItem('access_token', action.payload.message.access_token); //сохраняем в браузере ответ
            })
    }
})

export const {enterLogin, enterPassword} = loginFormSlice.actions;
export default loginFormSlice.reducer