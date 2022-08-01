import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items.length === 0) {
        state.items = [...state.items, action.payload];
      }
      
      // Not in cart slice, add nft to cart slice
      else if (state.items.length > 0) {
        state.items.forEach(_id => {
          if (action.payload._id === _id._id) {
            console.log('Already in cart!')
            alert(`Already in cart!`);
            return setScanned(true)
          }
        })
        state.items = [...state.items, action.payload];
      }
    },


    removeFromCart: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${payload.id}} as its not in the cart`
        );
      }
      state.items = newCart;
    },



    checkingCart: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      let newCart = [...state.items];
      if (index >= 0) {
        console.warn(
          `Product (id: ${payload._id}} is already in cart`
        );
      } else {
        newCart.splice(index, 1);

      }
      state.items = newCart;
    },



    emptyCart: () => initialState,
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  emptyCart,
} = cartSlice.actions;
export const selectItem = (state) => state.cart.items;
export default cartSlice.reducer;
