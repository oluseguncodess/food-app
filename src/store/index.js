import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../store/cart'

// create store 
const store = configureStore({
    reducer: {cart: cartReducer}
})

//export store 
export default store;