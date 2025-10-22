import React, { useState, useCallback } from "react";

interface TextInputProps {
  label?: string;
  type?: "text" | "email" | "password" | "phone";
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  id,
  className = "",
  maxLength,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Phone number formatting function
  const formatPhoneNumber = useCallback((input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, "");

    // Handle different phone number formats
    if (numbers.length === 0) return "";

    // US phone number formatting
    if (numbers.length <= 3) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
        6
      )}`;
    } else if (numbers.length === 11 && numbers[0] === "1") {
      // Handle country code +1
      return `+1 (${numbers.slice(1, 4)}) ${numbers.slice(
        4,
        7
      )}-${numbers.slice(7)}`;
    } else {
      // For longer numbers, just format the first 10 digits
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
        6,
        10
      )}`;
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Apply phone number formatting if type is phone
      if (type === "phone") {
        newValue = formatPhoneNumber(newValue);
      }

      // Update internal state
      setInternalValue(newValue);

      // Call onChange callback
      if (onChange) {
        onChange(newValue);
      }
    },
    [type, formatPhoneNumber, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace for phone numbers
      if (type === "phone" && e.key === "Backspace") {
        e.preventDefault();
        const currentValue = value !== undefined ? value : internalValue;
        const numbers = currentValue.replace(/\D/g, "");

        if (numbers.length > 0) {
          const newNumbers = numbers.slice(0, -1);
          const formattedValue = formatPhoneNumber(newNumbers);

          setInternalValue(formattedValue);
          if (onChange) {
            onChange(formattedValue);
          }
        }
      }
    },
    [type, value, internalValue, formatPhoneNumber, onChange]
  );

  // Determine the actual input type for HTML
  const inputType = type === "phone" ? "tel" : type;

  // Generate unique ID if not provided
  const inputId = id || `text-input-${Math.random().toString(36).substr(2, 9)}`;

  // Determine current value
  const currentValue = value !== undefined ? value : internalValue;

  // Build input classes
  const inputClasses = [
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
    error ? "border-red-500" : "border-gray-300",
    disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={inputType}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={maxLength}
        className={inputClasses}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
