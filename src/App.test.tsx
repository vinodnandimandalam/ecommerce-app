import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { RequestStatus } from "./types/request-status";
import type { IProduct } from "./types/product";
import { Provider } from "react-redux";
import { renderWithRouter } from "./test-utils/RenderRouter";

const createMockStore = (products: IProduct[]) => {
  return configureStore({
    reducer: {
      products: () => ({
        products: products,
        status: RequestStatus.SUCCESSFULL,
      }),
    },
  });
};

describe("App", () => {
  let mockStore: ReturnType<typeof createMockStore>;
  const mockProducts: IProduct[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  ];

  beforeEach(() => {});

  beforeAll(() => {
    jest.clearAllMocks();
    mockStore = createMockStore(mockProducts);
  });

  it("should render the App component and Navbar and Footer should be rendered", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    const footerContainer = screen.getByTestId("footer-container");
    expect(footerContainer).toBeInTheDocument();
  });

  it("Should render Home component", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <App />
      </Provider>,
      { route: "/" }
    );
    const container = screen.getByTestId("home-container");
    expect(container).toBeInTheDocument();
  });

  it("Should render Shop component", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <App />
      </Provider>,
      { route: "/shop" }
    );

    const container = screen.getByTestId("shop-container");
    expect(container).toBeInTheDocument();
  });
});
