import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice"
import alertReducer from "./AlertSlice"
import productsReducer from "./ProductsSlice"

export const store=configureStore({
    reducer:{
        users:usersReducer,
        alert:alertReducer,
        products:productsReducer,
    },
})