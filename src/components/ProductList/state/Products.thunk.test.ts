import type { IProduct } from "../../../types/product";
import { fetchProducts } from "./Products.thunk";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Products.slice";
import { getRequest } from "../../../network/Network";
import type { AppDispatch } from "../../../types/state";
import { AxiosError } from "axios";

const mockProducts: IProduct[] = [
  {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test description",
    category: "test",
    image: "test.jpg",
    rating: { rate: 4.5, count: 100 },
  },
];

jest.mock("../../../network/Network");
const mockedGetRequest = getRequest as jest.MockedFunction<typeof getRequest>;

describe("Products Thunk", () => {
  let store: ReturnType<typeof configureStore> & { dispatch: AppDispatch };

  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: true,
        }),
    });
  });

  it("should fetch products successfully", async () => {
    // Mock successful response
    mockedGetRequest.mockResolvedValue(mockProducts);

    const result = await store.dispatch(fetchProducts({ limit: 10, skip: 0 }));

    expect(mockedGetRequest).toHaveBeenCalledWith("/products");
    expect(result.type).toBe("products/fetchProducts/fulfilled");
    expect(result.payload).toEqual(mockProducts.slice(0, 10));
  });

  it("should handle no response from server", async () => {
    // Mock no response (falsy value)
    mockedGetRequest.mockResolvedValue(null);

    const result = await store.dispatch(fetchProducts({ limit: 10, skip: 0 }));

    expect(mockedGetRequest).toHaveBeenCalledWith("/products");
    expect(result.type).toBe("products/fetchProducts/rejected");
    expect(result.payload).toEqual("No response from the server");
  });

  it("should handle axios error", async () => {
    const axiosError = new AxiosError("Request failed with status code 500");
    mockedGetRequest.mockRejectedValue(axiosError);

    const result = await store.dispatch(fetchProducts({ limit: 10, skip: 0 }));

    expect(mockedGetRequest).toHaveBeenCalledWith("/products");
    expect(result.type).toBe("products/fetchProducts/rejected");
    expect(result.payload).toEqual("Request failed with status code 500");
  });
});
