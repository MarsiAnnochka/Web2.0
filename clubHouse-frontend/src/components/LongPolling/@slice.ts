import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../../utils/API";

export interface smsArray {
    sms_array: string[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface Response {
    type: string;
    message: {
        access_token: string;
    }
}

const initialState: smsArray = {
    sms_array: [],
    loading: 'idle',
}

export const getAllMessages = createAsyncThunk(
    'messages',
    async () => {
        const postOptions = {
            method: 'GET'
        };
        console.log("ALL mssgs STARTED")
        const data = await fetchData('/api/messages', postOptions)
        const allMessages = (await data.json()).sms_array;
        console.log('allMessages:', allMessages);
        console.log("ALL mssgs FINISHED");
        return allMessages;
    }
)

export const getMessage = createAsyncThunk(
    'get-messages',
    async () => {
        const postOptions = {
            method: 'GET'
        };
        try {
            console.log("STARTED")
            const data = await fetchData('/api/get-message', postOptions)
            const messages = (await data.json()).sms_array
            console.log('getMessage:', messages);
            console.log("FINISHED");
            console.log(messages)
        } catch (err) {
            console.log('Error' + err)
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
        console.log('sendMessage:', message)
        const response = await fetchData('/api/new-message/', postOptions);
        const data = (await response.json()).message
        console.log('response:', data)
        return await data;
    }
)

export const messageSlice = createSlice({
        name: 'message',
        initialState,
        reducers: {
            setMessages: (state, action: PayloadAction<string[]>) => {
                state.sms_array = action.payload;
                state.loading = 'succeeded'
            }
        },
        extraReducers: builder => {
            builder.addCase(sendMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.sms_array.push(action.payload)
            })
            builder.addCase(getMessage.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(getMessage.fulfilled, (state, action) => {
                state.loading = 'succeeded';
            })
            builder.addCase(getAllMessages.pending, (state, action) => {
                state.loading = 'pending'
            })
            builder.addCase(getAllMessages.fulfilled, (state, action: { payload: any }) => {
                state.loading = 'succeeded';
                state.sms_array = action.payload;
            })
        }
    }
)

export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;