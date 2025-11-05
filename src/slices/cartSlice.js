import { createSlice } from "@reduxjs/toolkit";
const persisted = JSON.parse(
  localStorage.getItem("shopsmart_cart_v1") || '{"items":{}}'
);

const cartSlice = createSlice({
  name: "cart",
  initialState: persisted,
  reducers: {
    addToCart: (state, { payload }) => {
      const id = payload.id;
      if (!state.items[id]) state.items[id] = { product: payload, qty: 0 };
      state.items[id].qty++;
    },
    updateQuantity: (state, { payload }) => {
      const { id, qty } = payload;
      if (qty <= 0) delete state.items[id];
      else state.items[id].qty = qty;
    },
    removeFromCart: (state, { payload }) => {
      delete state.items[payload];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
