import { PayloadAction } from "@reduxjs/toolkit";
export interface RoomState {
    createRoomState: [];
    joinRoomState: [];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
export declare const createRoom: import("@reduxjs/toolkit").AsyncThunk<Response, string, {}>;
export declare const joinRoom: import("@reduxjs/toolkit").AsyncThunk<Response, string, {}>;
export declare const RoomSlice: import("@reduxjs/toolkit").Slice<RoomState, {
    createRoom: (state: import("immer/dist/internal").WritableDraft<RoomState>, action: PayloadAction<any>) => void;
    joinRoom: (state: import("immer/dist/internal").WritableDraft<RoomState>, action: PayloadAction<any>) => void;
}, "room">;
declare const _default: import("@reduxjs/toolkit").Reducer<RoomState, import("@reduxjs/toolkit").AnyAction>;
export default _default;
