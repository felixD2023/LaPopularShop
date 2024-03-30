import { createSlice } from "@reduxjs/toolkit";

const initialState =  {buys:[]}

const buysSlice = createSlice({
    name:'buys',
    initialState,
    reducers:{
        setBuys:(state,action)=>{
            state.buys = [...action.payload]
        },
    }
})

export const { setBuys } = buysSlice.actions
export default buysSlice.reducer


