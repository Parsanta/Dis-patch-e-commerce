// cartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
console.log(initialState);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const targetItem = state.items.find((item) => item.id === itemId);

      if (targetItem) {
        targetItem.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const targetItem = state.items.find((item) => item.id === itemId);

      if (targetItem && targetItem.quantity > 1) {
        targetItem.quantity -= 1;
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    loadCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    },
  },
});

export const { addToCart, removeFromCart, clearCart,loadCart,incrementQuantity,decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
