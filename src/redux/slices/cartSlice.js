import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0
};

const cartSlise = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItems = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItems) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItems.quantity++;
        existingItems.totalPrice = Number(existingItems.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
    },
  }
});

export const cartAction = cartSlise.actions;

export default cartSlise.reducer;