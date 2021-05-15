import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../../utils/API";

export interface Form {
    messages: string[];
}

export interface MessageState {
    messages: string[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface Response {
    type: string;
    message: {
        access_token: string;
    }
}

const initialState: MessageState = {
    messages: [],
    loading: 'idle',
}

export const subscribe = createAsyncThunk(
    'get-messages',
    async () => {
        const postOptions = {
            method: 'GET'
        };
        try {
            await fetchData('/api/get-message/', postOptions)
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
                payload: data.messages
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
            enterMessage: (state, action: PayloadAction<string[]>) => {
                state.messages = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(sendMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                localStorage.setItem('access_token', action.payload.message.access_token);
            })
        }
    }
)

export const {enterMessage} = messageSlice.actions;
export default messageSlice.reducer;