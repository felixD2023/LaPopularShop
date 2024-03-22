import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] }

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = [...action.payload]
        },
        deleteProduct: (state, action) => {
            const products = state.products.filter(p => p.id !== action.payload)
            state.products = [...products]
        }
    }
})

export const { setProducts , deleteProduct } = productsSlice.actions;
export default productsSlice.reducer


