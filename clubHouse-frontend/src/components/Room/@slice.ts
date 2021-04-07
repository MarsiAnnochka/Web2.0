import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface RoomState {
    createRoomState: [];
    joinRoomState: [];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: RoomState = {
    createRoomState: [],
    joinRoomState: [],
    loading: 'idle'
}

export const createRoom = createAsyncThunk
('room/createByName', async (roomName: string, thunkAPI) => {
    const postOptions = {
        method: 'GET',
    };
    const response = await fetch(`/api/room?name=${roomName}`, postOptions);
    return (await response.json()) as Response;
})

export const joinRoom = createAsyncThunk
('room/joinByID', async (roomId: string, thunkAPI) => {
    const postOptions = {
        method: 'GET',
    };
    const response = await fetch(`/api/room/${roomId}`, postOptions);
    return (await response.json()) as Response;
})

export const RoomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        createRoom: (state, action: PayloadAction<any>) => {
            state.createRoomState = action.payload.createRoomState;
            state.loading = 'succeeded';
        },
        joinRoom: (state, action: PayloadAction<any>) => {
            state.joinRoomState = action.payload.joinRoomState;
            state.loading = 'succeeded';
        }
    },
    extraReducers: builder => {
        builder.addCase(createRoom.pending, (state, action) => {
            state.loading = 'pending';
        })
            .addCase(joinRoom.pending, (state, action) => {
                state.loading = 'pending';
            })
            .addCase(createRoom.rejected, (state, action) => {
                console.log('Error: Room creation Error!')
            })
            .addCase(joinRoom.rejected, (state, action) => {
                console.log('Error: Join the Room Error!')
            })
    }
})

export default RoomSlice.reducer