import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../../utils/API";

export interface Form {
    messages: string[];
}

export interface smsArray {
    sms_array: Form;
}

export interface MessageState {
    message: string[];
    sms_array: string[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface Response {
    type: string;
    message: {
        access_token: string;
    }
}

const initialState: MessageState = {
    message: [],
    sms_array: [],
    loading: 'idle',
}

export const getMessage = createAsyncThunk(
    'get-messages',
    async () => {
        const postOptions = {
            method: 'GET'
        };
        while (true) {
            try {
                console.log("STARTED")
                const data = await fetchData('/api/get-message', postOptions)
                const messages = (await data.json()).sms_array
                console.log(messages);
                console.log("FINISHED");
            } catch (err) {
                console.log('Error' + err)
            }
        }
    }
)

export const sendMessage = createAsyncThunk(
    'new-messages',
    async (message: string, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({
                payload: message
            }),
            method: 'POST'
        };
        console.log(message)
        const response = await fetchData('/api/new-message/', postOptions);
        return await (response.json()) as Response;
    }
)

export const messageSlice = createSlice({
        name: 'message',
        initialState,
        reducers: {
            setMessages: (state, action: PayloadAction<string[]>) => {
                state.message = action.payload;
                state.loading = 'succeeded'
            }
        },
        extraReducers: builder => {
            builder.addCase(sendMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.message = [];
                localStorage.setItem('access_token', action.payload.message.access_token);
            })
            builder.addCase(getMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(getMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.message = [];
            })
        }
    }
)

export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;