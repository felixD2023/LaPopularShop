import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice"
import alertReducer from "./AlertSlice"
import productsReducer from "./ProductsSlice"
import cartReducer from "./CartSlice"

export const store=configureStore({
    reducer:{
        users:usersReducer,
        alert:alertReducer,
        products:productsReducer,
        cart:cartReducer
    },
})