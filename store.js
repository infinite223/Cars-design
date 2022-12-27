import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'
import selectedRoomReducer from './slices/selectedRoomSlice'
import selectedProjectSlice  from './slices/selectedProject';
import navigationSlice from './slices/navigationSlice';
import chatsSlice from './slices/chatsSlice';
import promptSlice from './slices/promptSlice';
import hideProjectsSlice from './slices/hideProjects';

export const store = configureStore({
    reducer: {
        theme:themeReducer,
        language:languageReducer,
        room:selectedRoomReducer,
        project:selectedProjectSlice,
        showNavigation:navigationSlice,
        chats:chatsSlice,
        prompt:promptSlice,
        hideProjects:hideProjectsSlice
    }
})