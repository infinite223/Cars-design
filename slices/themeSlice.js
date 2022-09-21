import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    background:'black',
    fontColor:'white',
    fontColorContent: '#aaa'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme

export default themeSlice.reducer;