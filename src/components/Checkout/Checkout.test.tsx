import Checkout from "./Checkout";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../Navbar/Navbar.test";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../Cart/state/Cart.slice";
import type { CarProduct } from "../Cart/state/Cart.slice";
import { Provider } from "react-redux";

describe("Checkout", () => {
  const createMockStore = (cartState: {
    productsInCart: CarProduct[];
    totalPrice: number;
    totalQuantity: number;
    address: string;
  }) => {
    return configureStore({
      reducer: {
        cart: cartSlice.reducer,
        products: () => ({
          products: [],
        }),
      },
      preloadedState: {
        cart: cartState,
      },
    });
  };

  const mockStore = createMockStore({
    productsInCart: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 2,
      },
    ],
    totalPrice: 400,
    totalQuantity: 3,
    address: "123 Main St, Anytown, USA",
  });

  it("should render the Checkout component", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const container = screen.getByTestId("checkout-container");
    expect(container).toBeInTheDocument();
  });

  it("should render the billing address section", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const billingAddress = screen.getByText("Billing Address");
    expect(billingAddress).toBeInTheDocument();
  });

  it("should render the shipping information section", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const shippingInformation = screen.getByText("Shipping Information");
    expect(shippingInformation).toBeInTheDocument();
  });

  it("should render the billing address form", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const name = screen.getByRole("textbox", { name: /name/i });
    expect(name).toBeInTheDocument();
  });

  it("should render the shipping information form", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const address = screen.getByRole("textbox", { name: /address/i });
    expect(address).toBeInTheDocument();
  });

  it("should render the billing address form fields", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const name = screen.getByRole("textbox", { name: /name/i });
    expect(name).toBeInTheDocument();
    const email = screen.getByRole("textbox", { name: /email/i });
    expect(email).toBeInTheDocument();
    const phone = screen.getByRole("textbox", { name: /phone/i });
    expect(phone).toBeInTheDocument();
  });

  it("should render the shipping information form fields", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <Checkout />
      </Provider>
    );
    const address = screen.getByRole("textbox", { name: /address/i });
    expect(address).toBeInTheDocument();
    const city = screen.getByRole("textbox", { name: /city/i });
    expect(city).toBeInTheDocument();
    const zipCode = screen.getByRole("textbox", { name: /zip code/i });
    expect(zipCode).toBeInTheDocument();
  });
});
