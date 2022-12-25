import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prompt: {
        show:false,
        message:'',
        type: '',
        data: {}
    }
}

export const promptSlice = createSlice({
    name: 'prompt',
    initialState,
    reducers: {
        setPrompt: (state, action) => {
            console.log(action.payload, 'tu')
            state.prompt = action.payload
        }
    }
})

export const { setPrompt } = promptSlice.actions
export const selectPrompt = (state) => state.prompt.prompt

export default promptSlice.reducer;