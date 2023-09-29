import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity <= 1) return;
      item.quantity -= 1;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    cleareAll(state) {
      state.cart = [];
      state.cart;
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  cleareAll,
} = cartSlice.actions;

export const getTotalPizzaNum = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (store) => store.cart.cart;

export const getUsername = (store) => store.user.username;

export const gerCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
