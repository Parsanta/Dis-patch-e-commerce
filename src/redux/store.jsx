// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return undefined;
  }
};

const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCartFromStorage() || [],
    },
  },
});

store.subscribe(() => {
  const cartState = store.getState().cart;
  saveCartToStorage(cartState.items);
});

export default store;
