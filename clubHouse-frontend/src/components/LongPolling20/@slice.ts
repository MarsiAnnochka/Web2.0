import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchData} from '../../utils/API';

export interface Form {
    value: string;
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

export const sendMessage = createAsyncThunk(
    'login/auth',
    async (data: Form, thunkAPI) => {

        const postOptions = {
            body: JSON.stringify({
                from: 1,
                to: 2,
                payload: data.value,
                //id: Date.now()
            }),
            method: 'POST'
        };
        try {
            const response = await fetchData('/api/new-message/', postOptions);
            if (response.ok === false) {
                alert('The data is incorrect :( Try it again')
            } else {
                return await (response.json()) as Response;
            }
        } catch (err) {
            console.log("Error: ", err.message);
        }
    })

export const subscribe = createAsyncThunk(
    'get-messages',
    async () => {
        const postOptions = {
            method: 'GET'
        };
        try {
            const data = await fetchData('/api/get-message/', postOptions)
            //setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (err) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }
)
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
    //"builder callback API", для асинхронных операций
    extraReducers: builder => {
        builder.addCase(sendMessage.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
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