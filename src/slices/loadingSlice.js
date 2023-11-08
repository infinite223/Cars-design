import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   show: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.show = action.payload
        }
    }
})

export const { setLoading } = loadingSlice.actions
export const selectLoading = (state) => state.loading.show

export default loadingSlice.reducer;