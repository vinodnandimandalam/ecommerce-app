import Cart from "./Cart";
import { render, screen } from "@testing-library/react";
import { cartSlice, type CarProduct } from "./state/Cart.slice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// render list of products in cart

describe("Cart", () => {
  const testProductsInCart: CarProduct[] = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
    },
  ];

  const createMockStore = (productsInCart: CarProduct[]) => {
    return configureStore({
      reducer: {
        cart: cartSlice.reducer,
        products: () => ({
          products: [],
        }),
      },
      preloadedState: {
        cart: {
          productsInCart: productsInCart,
          totalPrice: productsInCart.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
          totalQuantity: productsInCart.reduce(
            (acc, product) => acc + product.quantity,
            0
          ),
        },
      },
    });
  };

  const mockStore = createMockStore(testProductsInCart);

  it("should render Cart component", () => {
    render(
      <Provider store={mockStore}>
        <Cart />
      </Provider>
    );
    const cartContainer = screen.getByTestId("cart-container");
    expect(cartContainer).toBeInTheDocument();
  });

  it("Should render the list of products in cart", () => {
    render(
      <Provider store={mockStore}>
        <Cart />
      </Provider>
    );
    const cartItemContainers = screen.getAllByTestId("cart-item-container");
    expect(cartItemContainers).toHaveLength(testProductsInCart.length);
  });
});
