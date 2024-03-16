import { createSlice } from "@reduxjs/toolkit";

const initialState = {users:[]}

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        setUsers: (state,action)=>{
            state.users=[...action.payload]
        },
        deleteUser: (state,action)=>{
            const users = state.users.filter(u=>u.ci!==action.payload)
            state.users = [...users]
        }
    }
});

export const {setUsers,deleteUser} = usersSlice.actions

export default usersSlice.reducer


