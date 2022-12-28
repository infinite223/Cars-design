import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const hideProjectsSlice = createSlice({
    name: 'hideProjects',
    initialState,
    reducers: {
        setChats: (state, action) => {
            state = action.payload
        }
    }
})

export const { setHideProjects } = hideProjectsSlice.actions
export const selectHideProjects = (state) => state.hideProjects

export default hideProjectsSlice.reducer;