import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "./TextInput";

describe("TextInput", () => {
  // Basic rendering tests
  it("should render text input with label", () => {
    render(<TextInput label="Name" />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render text input with placeholder", () => {
    render(<TextInput placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("should render text input with default value", () => {
    render(<TextInput defaultValue="John Doe" />);

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  // Input type tests
  it("should render email input when type is email", () => {
    render(<TextInput type="email" label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("should render password input when type is password", () => {
    render(<TextInput type="password" label="Password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("should render tel input when type is phone", () => {
    render(<TextInput type="phone" label="Phone" />);

    const input = screen.getByLabelText("Phone");
    expect(input).toHaveAttribute("type", "tel");
  });

  // Validation error tests
  it("should display validation error when provided", () => {
    render(<TextInput label="Email" error="Email is required" />);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toHaveClass("text-red-500");
  });

  it("should not display error when no error provided", () => {
    render(<TextInput label="Name" />);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  // User interaction tests
  it("should update value when user types", async () => {
    const user = userEvent.setup();
    render(<TextInput label="Name" />);

    const input = screen.getByLabelText("Name");
    await user.type(input, "John Doe");

    expect(input).toHaveValue("John Doe");
  });

  it("should call onChange when provided", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TextInput label="Name" onChange={onChange} />);

    const input = screen.getByLabelText("Name");
    await user.type(input, "John");

    expect(onChange).toHaveBeenCalled();
  });

  // Phone number formatting tests
  it("should format phone number as user types", async () => {
    const user = userEvent.setup();
    render(<TextInput type="phone" label="Phone" />);

    const input = screen.getByLabelText("Phone");
    await user.type(input, "1234567890");

    expect(input).toHaveValue("(123) 456-7890");
  });

  it("should handle phone number with country code", async () => {
    const user = userEvent.setup();
    render(<TextInput type="phone" label="Phone" />);

    const input = screen.getByLabelText("Phone");
    await user.type(input, "11234567890");

    expect(input).toHaveValue("+1 (123) 456-7890");
  });

  it("should allow backspace in phone number", async () => {
    const user = userEvent.setup();
    render(
      <TextInput type="phone" label="Phone" defaultValue="(123) 456-7890" />
    );

    const input = screen.getByLabelText("Phone");
    await user.type(input, "{backspace}");

    expect(input).toHaveValue("(123) 456-789");
  });

  // Required field tests
  it("should show required indicator when required", () => {
    render(<TextInput label="Name" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("should not show required indicator when not required", () => {
    render(<TextInput label="Name" />);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  // Disabled state tests
  it("should be disabled when disabled prop is true", () => {
    render(<TextInput label="Name" disabled />);

    const input = screen.getByLabelText("Name");
    expect(input).toBeDisabled();
  });

  it("should not be disabled when disabled prop is false", () => {
    render(<TextInput label="Name" disabled={false} />);

    const input = screen.getByLabelText("Name");
    expect(input).not.toBeDisabled();
  });

  // Accessibility tests
  it("should have proper accessibility attributes", () => {
    render(<TextInput label="Name" id="name-input" />);

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("id", "name-input");
  });

  it("should associate label with input", () => {
    render(<TextInput label="Email Address" id="email" />);

    const input = screen.getByLabelText("Email Address");
    const label = screen.getByText("Email Address");

    expect(input).toHaveAttribute("id", "email");
    expect(label).toHaveAttribute("for", "email");
  });

  // Error state styling tests
  it("should apply error styling to input when error exists", () => {
    render(<TextInput label="Email" error="Invalid email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveClass("border-red-500");
  });

  it("should not apply error styling when no error", () => {
    render(<TextInput label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).not.toHaveClass("border-red-500");
  });

  // Custom className tests
  it("should apply custom className to input", () => {
    render(<TextInput label="Name" className="custom-class" />);

    const input = screen.getByLabelText("Name");
    expect(input).toHaveClass("custom-class");
  });

  // Max length tests
  it("should respect maxLength attribute", () => {
    render(<TextInput label="Name" maxLength={10} />);

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
