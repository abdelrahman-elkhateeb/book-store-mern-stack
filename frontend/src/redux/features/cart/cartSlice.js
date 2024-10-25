import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "product added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "already added to the cart",
          icon: "warning",
          confirmButtonColor: "#ffce1a",
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
//export the actions

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
