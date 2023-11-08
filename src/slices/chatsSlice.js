import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    activeChat: ''
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action) => {
            console.log(action.payload, 'tu')
            state.chats = action.payload
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload
        }
    }
})

export const { setChats, setActiveChat } = chatsSlice.actions
export const selectChats = (state) => state.chats.chats
export const selectActiveChat = (state) => state.chats.activeChat


export default chatsSlice.reducer;