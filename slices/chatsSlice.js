import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: []
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action) => {
            console.log(action.payload, 'tu')
            state.chats = action.payload
        }
    }
})

export const { setChats } = chatsSlice.actions
export const selectChats = (state) => state.chats.chats

export default chatsSlice.reducer;