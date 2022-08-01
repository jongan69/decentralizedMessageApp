import { createSlice } from "@reduxjs/toolkit";

const ignoreSlice = createSlice({
  name: "ignore",
  initialState: [],
  reducers: {
    addToignore: (state, { payload }) => {
      const itemExists = state.find((item) => item.id === payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.find((item) => item.id === payload);
      item.quantity += 1;
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.find((item) => item.id === payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === payload);
        state.splice(index, 1);
      } else {
        item.quantity -= 1;
      }
    },
    removeFromignore: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    emptyignore: () => initialState,
  },
});


export const { addToignore, incrementQuantity, decrementQuantity, removeFromignore, emptyignore } = ignoreSlice.actions

export default ignoreSlice.reducer;