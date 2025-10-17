import { createSlice } from "@reduxjs/toolkit";

export interface CarProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  productsInCart: CarProduct[];
  totalPrice: number;
  totalQuantity: number;
}
const initialState: CartState = {
  productsInCart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const existingProduct = state.productsInCart.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.productsInCart.push({ id, name, price, quantity: 1 });
      }
      state.totalPrice += price;
      state.totalQuantity++;
    },
    increaseProductQuantity: (state, action) => {
      const { id } = action.payload;
      console.log("increaseProductQuantity", id);
      const existingProduct = state.productsInCart.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
      state.totalPrice += existingProduct?.price || 0;
      state.totalQuantity++;
    },
    decreaseProductQuantity: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.productsInCart.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.quantity--;
      }
      state.totalPrice -= existingProduct?.price || 0;
      state.totalQuantity--;
    },
    removeProductFromCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.productsInCart.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        state.totalPrice -=
          existingProduct?.price || 0 * existingProduct?.quantity || 0;
        state.totalQuantity -= existingProduct?.quantity || 0;
      }
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== id
      );
    },
  },
});

export default cartSlice.reducer;
export const {
  addProductToCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
} = cartSlice.actions;
