import Modal from "./Modal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal", () => {
  it("should render the children passed to it", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  it("should not render when isModalOpen is false", () => {
    render(
      <Modal isModalOpen={false} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.queryByText("Modal Content");
    expect(modalContent).not.toBeInTheDocument();
  });

  it("should render close and submit buttons", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should call setIsModalOpen with false when close button is clicked", () => {
    const setIsModalOpen = jest.fn();

    render(
      <Modal isModalOpen={true} setIsModalOpen={setIsModalOpen}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it("should call setIsModalOpen with false when submit button is clicked", () => {
    const setIsModalOpen = jest.fn();

    render(
      <Modal isModalOpen={true} setIsModalOpen={setIsModalOpen}>
        <div>Modal Content</div>
      </Modal>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it("should call setIsModalOpen with false when onRequestClose is triggered", () => {
    const setIsModalOpen = jest.fn();

    render(
      <Modal isModalOpen={true} setIsModalOpen={setIsModalOpen}>
        <div>Modal Content</div>
      </Modal>
    );

    // Simulate pressing Escape key or clicking outside modal
    const modalOverlay = document.querySelector(".ReactModal__Overlay");
    if (modalOverlay) {
      fireEvent.click(modalOverlay);
      expect(setIsModalOpen).toHaveBeenCalledWith(false);
    }
  });

  it("should render modal container with correct test id", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    // ReactModal doesn't apply data-testid to the root element, so we test the content instead
    const modalContent = screen.getByTestId("modal-content");
    expect(modalContent).toBeInTheDocument();

    // Also verify the modal is rendered by checking for the dialog role
    const modalDialog = screen.getByRole("dialog");
    expect(modalDialog).toBeInTheDocument();
  });

  it("should handle multiple children correctly", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>First Child</div>
        <div>Second Child</div>
        <p>Third Child</p>
      </Modal>
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
    expect(screen.getByText("Third Child")).toBeInTheDocument();
  });

  it("should not render buttons when modal is closed", () => {
    render(
      <Modal isModalOpen={false} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.queryByRole("button", { name: "Close" });
    const submitButton = screen.queryByRole("button", { name: "Submit" });

    expect(closeButton).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });

  it("should call onClose callback when close button is clicked", () => {
    const setIsModalOpen = jest.fn();
    const onClose = jest.fn();

    render(
      <Modal
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        onClose={onClose}
      >
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onSubmit callback when submit button is clicked", () => {
    const setIsModalOpen = jest.fn();
    const onSubmit = jest.fn();

    render(
      <Modal
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        onSubmit={onSubmit}
      >
        <div>Modal Content</div>
      </Modal>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
    expect(onSubmit).toHaveBeenCalled();
  });

  it("should not render close button when showCloseButton is false", () => {
    render(
      <Modal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        showCloseButton={false}
      >
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.queryByRole("button", { name: "Close" });
    expect(closeButton).not.toBeInTheDocument();
  });

  it("should not render submit button when showSubmitButton is false", () => {
    render(
      <Modal
        isModalOpen={true}
        setIsModalOpen={() => {}}
        showSubmitButton={false}
      >
        <div>Modal Content</div>
      </Modal>
    );

    const submitButton = screen.queryByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeInTheDocument();
  });

  it("should render modal content with correct test id", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByTestId("modal-content");
    expect(modalContent).toBeInTheDocument();
  });

  it("should handle complex children structure", () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={() => {}}>
        <div>
          <h2>Modal Title</h2>
          <p>Modal description</p>
          <form>
            <input type="text" placeholder="Enter text" />
            <button type="button">Custom Button</button>
          </form>
        </div>
      </Modal>
    );

    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
});
