import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    value: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      //state.items.pop(action.payload);
      let a = current(state.items);
      let b = a.indexOf(action.payload);
      state.items.splice(b, 1);
    },
    clearCart: (state) => {
      state.items = [];
    },

    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  itemCount,
  increment,
  decrement,
} = cartSlice.actions;
export const selectCount = (state) => state.cart.value;
export default cartSlice.reducer;
