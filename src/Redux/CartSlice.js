import { createSlice } from "@reduxjs/toolkit";

const initialState={productos:[],total:0}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        insertarProducto:(state,action)=>{
            state.productos=[action.payload,...state.productos]
        }
    }
})

export const {insertarProducto}=cartSlice.actions
export default cartSlice.reducer