import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { InfoOptions, Categorys2 } from "../../constants/constants";
import { TestWrapper } from "../../test-utils";
import { renderWithRouter } from "../../test-utils/RenderRouter";

describe("Home", () => {
  it("Should render Banner Image", () => {
    renderWithRouter(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const bannerImage = screen.getByRole("img", { name: /banner/i });
    expect(bannerImage).toBeInTheDocument();
  });

  it("Should render Info Options with correct number of items", () => {
    renderWithRouter(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    // Get the info options container by data-testid
    const infoOptionsContainer = screen.getByTestId("info-options-container");
    expect(infoOptionsContainer).toBeInTheDocument();

    // Get all option divs (each info option is wrapped in a div)
    const infoOptions = infoOptionsContainer.querySelectorAll("div");
    // Filter out the container div itself, only count the option divs
    const optionDivs = Array.from(infoOptions).filter(
      (div) => div.querySelector("svg") && div.querySelector("h3")
    );
    expect(optionDivs).toHaveLength(InfoOptions.length);

    // Verify that each info option title is rendered
    InfoOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
    });
  });

  // new test case for Categorys2
  it("Should render Categorys2 with correct number of items", () => {
    renderWithRouter(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );
    const categorys2Container = screen.getByTestId("categorys2-container");
    const categorys2Items = categorys2Container.querySelectorAll("li");
    expect(categorys2Items).toHaveLength(Categorys2.length);
  });
});
