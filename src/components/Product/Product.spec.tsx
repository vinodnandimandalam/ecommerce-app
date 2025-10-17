import type { IProduct } from "../../types/product";
import Product from "./Product";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestWrapper } from "../../test-utils";

describe("Product", () => {
  const testProduct: IProduct = {
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
  };

  it("should render product component", () => {
    render(
      <TestWrapper>
        <Product product={testProduct} />
      </TestWrapper>
    );
    const containerElement = screen.getByTestId("product-wrapper");
    expect(containerElement).toBeInTheDocument();
  });

  it("should render content correctly", () => {
    render(
      <TestWrapper>
        <Product product={testProduct} />
      </TestWrapper>
    );
    const containerElement = screen.getByTestId("product-wrapper");
    expect(containerElement).toHaveTextContent(testProduct.category);
  });

  it("Should call the dispatch function on clicking add to cart button", () => {
    render(
      <TestWrapper>
        <Product product={testProduct} />
      </TestWrapper>
    );
    const addToCartButton = screen.getByRole("button", {
      name: "+",
    });
    expect(() => fireEvent.click(addToCartButton)).not.toThrow();
  });
});
