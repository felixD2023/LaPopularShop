import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  totalValue: 0,
  userCI: "",
  products: [],
}

const createBuySlice = createSlice({
  name: 'createBuy',
  initialState,
  reducers: {
    resetBuy: (state) => {
      state.products = []
      state.totalValue = 0
      state.userCI = ""
  },
  setUser: (state, action) => {
    state.userCI = action.payload
  },
  addProduct: (state, action) => {
    const productIndex = state.products.findIndex(p => p.product.id === action.payload.product.id)
    if (productIndex === -1) {
      state.products = [...state.products, action.payload]
      state.totalValue = state.totalValue + Number(action.payload.product.price);
    } else {
      state.products[productIndex].quantity = state.products[productIndex].quantity + 1;
      state.totalValue = state.totalValue + Number(state.products[productIndex].product.price);
    }
  },
}
})

export const { setUser, addProduct, resetBuy } = createBuySlice.actions
export default createBuySlice.reducer
