import { createSlice } from "@reduxjs/toolkit";

const initialState = {type:"",message:""}

export const alertSlice = createSlice({
    name:"alert",
    initialState,
    reducers:{
        setAlert:(state,action)=>{
            state.type=action.payload.type
            state.message = action.payload.message
        },
        clearAlert: (state)=>{
            state.type = ""
            state.message = ""
        }
    }
}) 

export const { clearAlert, setAlert } = alertSlice.actions
export default alertSlice.reducer

