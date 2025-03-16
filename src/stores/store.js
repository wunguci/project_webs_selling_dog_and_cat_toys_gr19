import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice.js';
import cartReducer from './cartSlice.js';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer
  },
});