import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../../utils/API";
import {loginUser} from "../LoginForm/@slice";

export interface Form {
    message: string;
}

export interface MessageState {
    message: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface Response {
    type: string;
    message: {
        access_token: string;
    }
}

const initialState: MessageState = {
    message: '',
    loading: 'idle',
}

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

export const sendMessage = createAsyncThunk(
    'new-messages',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({
                from: 1,
                to: 2,
                payload: data.message,
                //id: Date.now()
            }),
            method: 'POST'
        };
        const response = await fetchData('/api/new-message/', postOptions);
        return await (response.json()) as Response;
    }
)

export const messageSlice = createSlice({
        name: 'message',
        initialState,
        reducers: {
            enterMessage: (state, action: PayloadAction<string>) => {
                state.message = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(loginUser.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.message = '';
                localStorage.setItem('access_token', action.payload.message.access_token);
            })
        }
    }
)

export const {enterMessage} = messageSlice.actions;
export default messageSlice.reducer;