import { createSlice } from "@reduxjs/toolkit";

const initialState =  {buys:[]}

const buysSlice = createSlice({
    name:'buys',
    initialState,
    reducers:{
        setBuys:(state,action)=>{
            state.buys = [...action.payload]
        },
        deleteABuy:(state,action)=>{
            const buys = state.buys.filter(b=>b.id !== action.payload)
            state.buys = [...buys]
        }
    }
})

export const { setBuys, deleteABuy } = buysSlice.actions
export default buysSlice.reducer


