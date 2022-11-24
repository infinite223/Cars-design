import { createSlice } from "@reduxjs/toolkit";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width

const initialState = {
   show: SCREEN_WIDTH+100
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigation: (state, action) => {
            state.show = action.payload
        },       
    }
})

export const { setNavigation } = navigationSlice.actions
export const selectNavigation = (state) => state.showNavigation.show

export default navigationSlice.reducer;