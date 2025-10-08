import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "./ProductList";
import type { IProduct } from "../../types/product";
import { TestWrapper } from "../../test-utils";
import { RequestStatus } from "../../types/request-status";

describe("ProductList", () => {
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

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("should render product list component", () => {
    render(
      <TestWrapper products={mockProducts}>
        <ProductList limit={10} skip={0} />
      </TestWrapper>
    );
    const productList = screen.getByTestId("product-list-wrapper");
    expect(productList).toBeInTheDocument();
  });

  it("should render corrrect number of products", () => {
    render(
      <TestWrapper products={mockProducts} status={RequestStatus.SUCCESSFULL}>
        <ProductList limit={10} skip={0} />
      </TestWrapper>
    );
    const productList = screen.getAllByTestId("product-list-item-wrapper");
    expect(productList).toHaveLength(mockProducts.slice(0, 10).length);
  });

  it("should render loader when products are loading", () => {
    render(
      <TestWrapper products={[]} status={RequestStatus.PENDING}>
        <ProductList limit={10} skip={0} />
      </TestWrapper>
    );
    const loaderContainer = screen.getByTestId("loader-container");
    const products = screen.queryAllByTestId("product-list-item-wrapper");
    expect(products).toHaveLength(0);
    expect(loaderContainer).toBeInTheDocument();
  });

  it("should render error when products are failed", () => {
    render(
      <TestWrapper products={[]} status={RequestStatus.FAILED}>
        <ProductList limit={10} skip={0} />
      </TestWrapper>
    );
    const errorContainer = screen.getByTestId("error-container");
    expect(errorContainer).toBeInTheDocument();
  });
});
