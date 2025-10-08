import Shop from "./Shop";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../../test-utils/RenderRouter";
import { TestWrapper } from "../../test-utils";

describe("Shop", () => {
  it("should render the Shop component", () => {
    renderWithRouter(
      <TestWrapper>
        <Shop />
      </TestWrapper>,
      { route: "/shop" }
    );
    const container = screen.getByTestId("shop-container");
    expect(container).toBeInTheDocument();
  });

  it("should render product list component", () => {
    renderWithRouter(
      <TestWrapper>
        <Shop />
      </TestWrapper>,
      { route: "/shop" }
    );
    const container = screen.getByTestId("product-list-wrapper");
    expect(container).toBeInTheDocument();
  });
});
