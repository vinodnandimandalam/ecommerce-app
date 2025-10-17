import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../components/ProductList/state/Products.slice";
import cartReducer from "../components/Cart/state/Cart.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
