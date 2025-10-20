import "@testing-library/jest-dom";
import Modal from "react-modal";

// Mock window.alert
Object.defineProperty(window, "alert", {
  value: jest.fn(),
  writable: true,
});

// Configure react-test-renderer
import "react-test-renderer";

// Configure react-modal for testing
Modal.setAppElement(document.createElement("div"));
