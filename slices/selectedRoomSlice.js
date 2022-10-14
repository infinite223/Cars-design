import { createSlice } from "@reduxjs/toolkit";
import { MeetingRoom } from '../utils/types'

const initialState = {
    room: "",
    tab: 'People'
}

export const selectedRoomSlice = createSlice({
    name: 'selectedRoom',
    initialState,
    reducers: {
        setSelectedRoom: (state, action) => {
            state.room = action.payload
        },
        setSelectedTabInRoom: (state, action) => {
            state.tab = action.payload
        }
    }
})

export const { setSelectedRoom, setSelectedTabInRoom } = selectedRoomSlice.actions
export const selectRoom = (state) => state.room.room
export const selectedTabInRoom = (state) => state.room.tab

export default selectedRoomSlice.reducer;