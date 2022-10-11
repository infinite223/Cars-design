import { createSlice } from "@reduxjs/toolkit";
import { MeetingRoom } from '../utils/types'

const initialState = {
    room: ""
}

export const selectedRoomSlice = createSlice({
    name: 'selectedRoom',
    initialState,
    reducers: {
        setSelectedRoom: (state, action) => {
            state.room = action.payload
        }
    }
})

export const { setSelectedRoom } = selectedRoomSlice.actions
export const selectRoom = (state) => state.room.room

export default selectedRoomSlice.reducer;