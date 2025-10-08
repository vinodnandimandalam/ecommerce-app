import { configureStore } from "@reduxjs/toolkit";
import type { IProduct } from "../types/product";
import { RequestStatus } from "../types/request-status";
import type { RequestStatusType } from "../types/request-status";

// Create a mock store with products
export const createMockStore = (
  products: IProduct[] = [],
  status: RequestStatusType = RequestStatus.SUCCESSFULL
) => {
  return configureStore({
    reducer: {
      products: () => ({
        products: products,
        status: status,
      }),
    },
  });
};
