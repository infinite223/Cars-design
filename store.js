import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'
import selectedRoomReducer from './slices/selectedRoomSlice'
import selectedProjectSlice  from './slices/selectedProject';
import navigationSlice from './slices/navigationSlice';

export const store = configureStore({
    reducer: {
        theme:themeReducer,
        language:languageReducer,
        room:selectedRoomReducer,
        project:selectedProjectSlice,
        showNavigation:navigationSlice
    }
})