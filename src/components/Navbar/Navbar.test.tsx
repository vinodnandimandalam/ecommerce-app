import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("Navbar", () => {
  describe("Logo/Heading", () => {
    it("should display brand name", () => {
      renderWithRouter(<Navbar />);
      const brandName = screen.getByRole("heading", { level: 1 });
      expect(brandName).toHaveTextContent("E-Shopzz");
    });

    it("should navigate to home page on clicking on brand name", async () => {
      renderWithRouter(<Navbar />);
      const homeLink = screen.getByRole("link", { name: /e-shopzz/i });
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Search Bar", () => {
    it("should render a search bar", () => {
      renderWithRouter(<Navbar />);
      const searchBar = screen.getByRole("searchbox", { name: /search/i });
      expect(searchBar).toBeInTheDocument();
    });
  });

  describe("Login/Signup Button", () => {
    it("should render a login/signup button", () => {
      renderWithRouter(<Navbar />);
      const loginSignupButton = screen.getByRole("button", {
        name: /login\/signup/i,
      });
      expect(loginSignupButton).toBeInTheDocument();
    });
  });

  describe("RenderCart Button", () => {
    it("should render a cart button", () => {
      renderWithRouter(<Navbar />);
      const cartButton = screen.getByRole("button", {
        name: /cart/i,
      });
      expect(cartButton).toBeInTheDocument();
    });
  });

  describe("Renders Navigation links", () => {
    it("Should render Home link", () => {
      renderWithRouter(<Navbar />);
      const homeLink = screen.getByRole("link", {
        name: /home/i,
      });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("Should render About link", () => {
      renderWithRouter(<Navbar />);
      const aboutLink = screen.getByRole("link", {
        name: /about/i,
      });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("Should render Contact link", () => {
      renderWithRouter(<Navbar />);
      const contactLink = screen.getByRole("link", {
        name: /contact/i,
      });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute("href", "/contact");
    });

    it("Should render Shop link", () => {
      renderWithRouter(<Navbar />);
      const shopLink = screen.getByRole("link", {
        name: "Shop",
      });
      expect(shopLink).toBeInTheDocument();
      expect(shopLink).toHaveAttribute("href", "/shop");
    });
  });
});
