import { createSlice } from "@reduxjs/toolkit";
import { MeetingRoom } from '../utils/types'

const initialState = {
   project: {}
}

export const selectedProjectSlice = createSlice({
    name: 'selectedProject',
    initialState,
    reducers: {
        setSelectedProject: (state, action) => {
            state.project = JSON.stringify(action.payload)
        },       
    }
})

export const { setSelectedProject } = selectedProjectSlice.actions
export const selectProject = (state) =>  JSON.parse(state.project.project)

export default selectedProjectSlice.reducer;    