import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    patients: []
}

const OpdSlice = createSlice({
    name: 'opd',
    initialState,
    reducers: {
        addToOpd(state, action){
            state.patients.push(action.payload)
        }
    }
})

export const { addToOpd } = OpdSlice.actions;
export default OpdSlice.reducer;