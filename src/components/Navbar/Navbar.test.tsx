import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

const createMockStore = (cartState: {
  productsInCart: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  totalQuantity: number;
}) => {
  return configureStore({
    reducer: {
      cart: () => ({
        productsInCart: cartState.productsInCart,
        totalPrice: cartState.totalPrice,
        totalQuantity: cartState.totalQuantity,
      }),
    },
  });
};

describe("Navbar", () => {
  describe("Logo/Heading", () => {
    it("should display brand name", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );

      const brandName = screen.getByRole("heading", { level: 1 });
      expect(brandName).toHaveTextContent("E-Shopzz");
    });

    it("should navigate to home page on clicking on brand name", async () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const homeLink = screen.getByRole("link", { name: /e-shopzz/i });
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Search Bar", () => {
    it("should render a search bar", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const searchBar = screen.getByRole("searchbox", { name: /search/i });
      expect(searchBar).toBeInTheDocument();
    });
  });

  describe("Login/Signup Button", () => {
    it("should render a login/signup button", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const loginSignupButton = screen.getByRole("button", {
        name: /login\/signup/i,
      });
      expect(loginSignupButton).toBeInTheDocument();
    });
  });

  describe("RenderCart Button", () => {
    it("should render a cart button", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const cartButton = screen.getByRole("button", {
        name: /cart/i,
      });
      expect(cartButton).toBeInTheDocument();
    });

    it("Should display 0 count if cart is empty", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });

      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const cartCountCounter = screen.getByTestId("cart-count-counter");
      expect(cartCountCounter).toHaveTextContent("0");
    });

    it("Should display the correct count if cart is not empty", () => {
      const mockStore = createMockStore({
        productsInCart: [{ id: 1, name: "Product 1", price: 10, quantity: 1 }],
        totalPrice: 10,
        totalQuantity: 1,
      });

      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const cartCountCounter = screen.getByTestId("cart-count-counter");
      expect(cartCountCounter).toHaveTextContent("1");
    });
  });

  describe("Renders Navigation links", () => {
    it("Should render Home link", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const homeLink = screen.getByRole("link", {
        name: /home/i,
      });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("Should render About link", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const aboutLink = screen.getByRole("link", {
        name: /about/i,
      });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("Should render Contact link", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const contactLink = screen.getByRole("link", {
        name: /contact/i,
      });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute("href", "/contact");
    });

    it("Should render Shop link", () => {
      const mockStore = createMockStore({
        productsInCart: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
      renderWithRouter(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      );
      const shopLink = screen.getByRole("link", {
        name: "Shop",
      });
      expect(shopLink).toBeInTheDocument();
      expect(shopLink).toHaveAttribute("href", "/shop");
    });
  });
});
