import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../../network/Network";
import { PRODUCTS_URL } from "../../../constants/constants";
import { AxiosError } from "axios";
import type { IProduct } from "../../../types/product";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { limit = 10, skip = 0 }: { limit: number; skip: number },
    thunkAPI
  ) => {
    try {
      const response: IProduct[] = await getRequest(PRODUCTS_URL);
      if (!response) {
        return thunkAPI.rejectWithValue("No response from the server");
      }
      return response.slice(skip, skip + limit) as IProduct[];
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message
          : "An unknown error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
