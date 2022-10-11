import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'
import selectedRoomReducer from './slices/selectedRoomSlice'

export const store = configureStore({
    reducer: {
        theme:themeReducer,
        language:languageReducer,
        room:selectedRoomReducer
    }
})