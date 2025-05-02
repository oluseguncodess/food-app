import { createSlice } from "@reduxjs/toolkit";

// create cart items slice

const cartInitialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if(existingItemIndex != -1) {
        const existingItem = state.items[existingItemIndex]
        existingItem.quantity++
      } else {
        state.items.push({...action.payload, quantity: 1})
      }
    },
    removeItem: () => {},
    clearCart: () => {},
  },
});

// export cart actions - this exposes the method so they can be used
export const cartActions =  cartSlice.actions;

// export cart reducer
export default cartSlice.reducer;
