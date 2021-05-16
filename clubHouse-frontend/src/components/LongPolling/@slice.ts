import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../../utils/API";
import {store} from "../../store";


export interface Form {
    message: string;
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
        console.log('Hi')
        const postOptions = {
            method: 'GET'
        };
        try {
            const data = await fetchData('/api/get-message', postOptions)
            const message = (await data.json()).message
            let Message = store.getState().message.messages
            Message.push(message)
            setMessages(message)
            subscribe()
        } catch (err) {
            setTimeout(() => {
                subscribe()
            }, 500)
            console.log('Error' + err)
        }
    }
)

export const sendMessage = createAsyncThunk(
    'new-messages',
    async (data: string, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({
                from: 1,
                to: 2,
                payload: data
            }),
            method: 'POST'
        };
        console.log(data)
        const response = await fetchData('/api/new-message/', postOptions);
        return await (response.json()) as Response;
    }
)

export const messageSlice = createSlice({
        name: 'message',
        initialState,
        reducers: {
            setMessages: (state, action: PayloadAction<string[]>) => {
                state.messages = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(sendMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.messages = [];
                localStorage.setItem('access_token', action.payload.message.access_token);
            })
        }
    }
)

export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;