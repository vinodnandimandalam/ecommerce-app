import CartTotal from "./CartTotal";
import { screen } from "@testing-library/react";
import { cartSlice, type CarProduct } from "../Cart/state/Cart.slice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderWithRouter } from "../Navbar/Navbar.test";

describe("CartTotal", () => {
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

  it("should render CartTotal component", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <CartTotal />
      </Provider>
    );

    expect(screen.getByTestId("cart-total-container")).toBeInTheDocument();
  });

  it("Should display total items in cart", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <CartTotal />
      </Provider>
    );

    // Test that the text "Total quantity: 3" is displayed in the DOM
    expect(screen.getByText("Total quantity: 3")).toBeInTheDocument();
  });

  it("Should display total price of the cart", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <CartTotal />
      </Provider>
    );
    expect(screen.getByText("Total price: $400")).toBeInTheDocument();
  });

  it("Should display the address", () => {
    renderWithRouter(
      <Provider store={mockStore}>
        <CartTotal />
      </Provider>
    );
    expect(
      screen.getByText("Address: 123 Main St, Anytown, USA")
    ).toBeInTheDocument();
  });
});
