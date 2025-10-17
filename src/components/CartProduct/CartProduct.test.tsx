import CartProduct from "./CartProduct";
import { TestWrapper } from "../../test-utils";
import { render, screen } from "@testing-library/react";
import { cartSlice, type CarProduct } from "../Cart/state/Cart.slice";
import { fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { IProduct } from "../../types/product";

describe("CartProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCartProduct: CarProduct = {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    quantity: 1,
  };

  const testProducts: IProduct[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Test description",
      category: "test",
      image: "test.jpg",
      rating: { rate: 4.5, count: 100 },
    },
  ];

  const createMockStore = (
    cartProducts: CarProduct[],
    products: IProduct[]
  ) => {
    return configureStore({
      reducer: {
        cart: cartSlice.reducer,
        products: () => ({
          products: products,
        }),
      },
      preloadedState: {
        cart: {
          productsInCart: cartProducts,
          totalPrice: cartProducts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
          totalQuantity: cartProducts.reduce(
            (acc, product) => acc + product.quantity,
            0
          ),
        },
      },
    });
  };

  it("should render CartProduct component", () => {
    const mockStore = createMockStore([testCartProduct], testProducts);
    render(
      <TestWrapper>
        <Provider store={mockStore}>
          <CartProduct cartProduct={testCartProduct} />
        </Provider>
      </TestWrapper>
    );
  });

  it("should render CartProduct component with correct props", () => {
    const mockStore = createMockStore([testCartProduct], testProducts);
    render(
      <TestWrapper>
        <Provider store={mockStore}>
          <CartProduct cartProduct={testCartProduct} />
        </Provider>
      </TestWrapper>
    );
    const cartProduct = screen.getByTestId("cart-product-wrapper");
    expect(cartProduct).toBeInTheDocument();
    expect(cartProduct).toHaveTextContent(testCartProduct.name);
    expect(cartProduct).toHaveTextContent(testCartProduct.price.toString());
    expect(cartProduct).toHaveTextContent(testCartProduct.quantity.toString());
  });

  it("should render product sub total is calculated correctly", () => {
    const mockStore = createMockStore([testCartProduct], testProducts);
    render(
      <TestWrapper>
        <Provider store={mockStore}>
          <CartProduct cartProduct={testCartProduct} />
        </Provider>
      </TestWrapper>
    );
    const cartProduct = screen.getByTestId("cart-product-wrapper");
    expect(cartProduct).toHaveTextContent(
      (testCartProduct.price * testCartProduct.quantity).toString()
    );
  });

  it("Should test product quantity can be increased", () => {
    const mockStore = createMockStore([testCartProduct], testProducts);
    render(
      <TestWrapper>
        <Provider store={mockStore}>
          <CartProduct cartProduct={testCartProduct} />
        </Provider>
      </TestWrapper>
    );
    const increaseQuantityButton = screen.getByRole("button", {
      name: "+",
    });
    expect(() => fireEvent.click(increaseQuantityButton)).not.toThrow();
    expect(testCartProduct.quantity).toBe(1);
  });

  it("Should test prodct can be removed from cart", () => {
    const mockStore = createMockStore([testCartProduct], testProducts);

    render(
      <TestWrapper>
        <Provider store={mockStore}>
          <CartProduct cartProduct={testCartProduct} />
        </Provider>
      </TestWrapper>
    );

    const increaseQuantityButton = screen.getByRole("button", {
      name: "+",
    });

    const removeFromCartButton = screen.getByRole("button", {
      name: "Remove from cart",
    });

    fireEvent.click(increaseQuantityButton);

    expect(() => fireEvent.click(removeFromCartButton)).not.toThrow();
    expect(mockStore.getState().cart.productsInCart).toHaveLength(0);
  });
});
