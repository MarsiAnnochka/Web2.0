import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchData} from '../../utils/API';

export interface Form {
    login: string;
    password: string;
}

export interface LoginFormState {
    login: string;
    password: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isAuth: boolean;
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
    loading: 'idle',
    isAuth: false,
}

export const loginUser = createAsyncThunk(
    'login/auth',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({username: data.login, password: data.password}),
            method: 'POST',
        };
        try {
            const response = await fetchData('/api/login/', postOptions);
            if (response.ok === false) {
                alert('The data is incorrect :( Try it again')
            } else {
                return await (response.json()) as Response;
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }
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
        isAuth: (state) => {
            state.isAuth = true;
        },
        defaultState: (state) => {
            state.isAuth = false;
            state.loading = 'idle';
        },
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.password = '';
            state.login = '';
            state.isAuth = true;
            localStorage.setItem('access_token', action.payload.message.access_token); //сохраняем в браузере ответ
        })
    }
})

export const {enterLogin, enterPassword, defaultState} = loginFormSlice.actions;
export default loginFormSlice.reducer