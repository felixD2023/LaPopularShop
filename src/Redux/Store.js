import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice"
import alertReducer from "./AlertSlice"
import productsReducer from "./ProductsSlice"
import buysReducer from './BuysSlice'
import createBuyReducer from './CreateBuySlice'

export const store=configureStore({
    reducer:{
        users:usersReducer,
        alert:alertReducer,
        products:productsReducer,
        buys:buysReducer,
        createBuy:createBuyReducer,
    },
})