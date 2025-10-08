import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../types/product";
import { RequestStatus } from "../../../types/request-status";
import type { RequestStatusType } from "../../../types/request-status";
import { fetchProducts } from "./Products.thunk";

interface ProductsState {
  products: IProduct[];
  status: RequestStatusType;
}

const initialState: ProductsState = {
  products: [],
  status: RequestStatus.IDLE,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = RequestStatus.PENDING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = RequestStatus.SUCCESSFULL;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = RequestStatus.FAILED;
    });
  },
});
export default productsSlice.reducer;
