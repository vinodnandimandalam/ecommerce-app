import "@testing-library/jest-dom";

// Mock window.alert
Object.defineProperty(window, "alert", {
  value: jest.fn(),
  writable: true,
});

// Configure react-test-renderer
import "react-test-renderer";
