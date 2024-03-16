import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice"
import alertReducer from "./AlertSlice"

export const store=configureStore({
    reducer:{
        users:usersReducer,
        alert:alertReducer,
    },
})