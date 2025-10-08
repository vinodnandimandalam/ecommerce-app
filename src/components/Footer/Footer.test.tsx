import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { screen } from "@testing-library/react";

describe("Footer", () => {
  it("should render the footer component", () => {
    render(<Footer />);
    const footerContainer = screen.getByTestId("footer-container");
    expect(footerContainer).toBeInTheDocument();
  });
});
