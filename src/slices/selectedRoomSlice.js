import { createSlice } from "@reduxjs/toolkit";
import { MeetingRoom } from '../utils/types'

const initialState = {
    room: "",
    tab: 'People',
    focuseOnSearch: false
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
        },
        setFocuseOnSearch: (state, action) => {
            state.focuseOnSearch = action.payload
        },
    }
})

export const { setSelectedRoom, setSelectedTabInRoom, setFocuseOnSearch } = selectedRoomSlice.actions
export const selectRoom = (state) => state.room.room
export const selectedTabInRoom = (state) => state.room.tab
export const selectFocuseOnSearch = (state) => state.room.focuseOnSearch

export default selectedRoomSlice.reducer;