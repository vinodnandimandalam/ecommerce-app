import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../components/ProductList/state/Products.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
