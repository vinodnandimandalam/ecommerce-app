# TextInput Component

A comprehensive, accessible, and feature-rich text input component built with React and TypeScript following TDD (Test-Driven Development) principles.

## Features

- ✅ **Multiple Input Types**: text, email, password, phone
- ✅ **Phone Number Formatting**: Automatic US phone number formatting
- ✅ **Validation Error Display**: Built-in error message display
- ✅ **Accessibility**: Full ARIA support and screen reader compatibility
- ✅ **Required Field Indicators**: Visual indicators for required fields
- ✅ **Disabled State**: Support for disabled inputs
- ✅ **Custom Styling**: Tailwind CSS classes with custom className support
- ✅ **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage
- ✅ **Comprehensive Testing**: 23 test cases covering all functionality

## Installation

No additional dependencies required. Uses React, TypeScript, and Tailwind CSS.

## Usage

### Basic Usage

```tsx
import TextInput from './components/text-input/TextInput';

// Basic text input
<TextInput label="Name" placeholder="Enter your name" />

// Email input
<TextInput
  type="email"
  label="Email"
  placeholder="Enter your email"
  required
/>

// Phone input with automatic formatting
<TextInput
  type="phone"
  label="Phone Number"
  placeholder="Enter your phone"
/>
```

### With Validation

```tsx
import { useState } from "react";
import TextInput from "./components/text-input/TextInput";

const MyForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <TextInput
      type="email"
      label="Email Address"
      value={email}
      onChange={handleEmailChange}
      error={emailError}
      required
      onBlur={validateEmail}
    />
  );
};
```

### Phone Number Formatting

```tsx
<TextInput
  type="phone"
  label="Phone Number"
  placeholder="Enter your phone number"
  onChange={(formattedNumber) => {
    console.log(formattedNumber); // "(123) 456-7890"
  }}
/>
```

**Phone Number Formatting Examples:**

- `1234567890` → `(123) 456-7890`
- `11234567890` → `+1 (123) 456-7890`
- `123` → `(123`
- `123456` → `(123) 456`

## Props

| Prop           | Type                                         | Default  | Description                                |
| -------------- | -------------------------------------------- | -------- | ------------------------------------------ |
| `label`        | `string`                                     | -        | Label text for the input                   |
| `type`         | `"text" \| "email" \| "password" \| "phone"` | `"text"` | Input type                                 |
| `placeholder`  | `string`                                     | -        | Placeholder text                           |
| `defaultValue` | `string`                                     | `""`     | Default value for uncontrolled usage       |
| `value`        | `string`                                     | -        | Controlled value                           |
| `onChange`     | `(value: string) => void`                    | -        | Change handler                             |
| `error`        | `string`                                     | -        | Error message to display                   |
| `required`     | `boolean`                                    | `false`  | Whether the field is required              |
| `disabled`     | `boolean`                                    | `false`  | Whether the input is disabled              |
| `id`           | `string`                                     | -        | Custom ID (auto-generated if not provided) |
| `className`    | `string`                                     | -        | Additional CSS classes                     |
| `maxLength`    | `number`                                     | -        | Maximum character length                   |

## Input Types

### Text Input

```tsx
<TextInput type="text" label="Name" placeholder="Enter your name" />
```

### Email Input

```tsx
<TextInput type="email" label="Email" placeholder="Enter your email" />
```

### Password Input

```tsx
<TextInput type="password" label="Password" placeholder="Enter your password" />
```

### Phone Input

```tsx
<TextInput type="phone" label="Phone Number" placeholder="Enter your phone" />
```

## Validation Examples

### Required Field Validation

```tsx
<TextInput label="Name" required error={!name ? "Name is required" : ""} />
```

### Email Validation

```tsx
<TextInput
  type="email"
  label="Email"
  error={
    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Invalid email" : ""
  }
/>
```

### Phone Validation

```tsx
<TextInput
  type="phone"
  label="Phone"
  error={phone && phone.replace(/\D/g, "").length < 10 ? "Invalid phone" : ""}
/>
```

## Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

### Custom Classes

```tsx
<TextInput
  label="Custom Input"
  className="border-purple-500 focus:ring-purple-500"
/>
```

### Error State Styling

When an error is present, the input automatically gets:

- Red border (`border-red-500`)
- Error message below the input
- ARIA attributes for accessibility

## Accessibility Features

- **ARIA Labels**: Proper label association with inputs
- **Error Announcements**: Screen readers announce validation errors
- **Required Indicators**: Visual and programmatic required field indicators
- **Focus Management**: Proper focus handling and keyboard navigation
- **Semantic HTML**: Uses proper HTML elements and attributes

## Testing

The component includes comprehensive tests covering:

- ✅ Basic rendering and props
- ✅ Input type variations
- ✅ Validation error display
- ✅ User interactions
- ✅ Phone number formatting
- ✅ Required field indicators
- ✅ Disabled state
- ✅ Accessibility attributes
- ✅ Custom styling
- ✅ Edge cases

Run tests:

```bash
npm test -- --testPathPatterns=TextInput.test.tsx
```

## Demo

Check out `TextInputDemo.tsx` for a complete example showcasing all features including:

- Form validation
- Different input types
- Phone number formatting
- Error handling
- Custom styling examples

## File Structure

```
src/components/text-input/
├── TextInput.tsx          # Main component
├── TextInput.test.tsx     # Comprehensive tests
├── TextInputDemo.tsx      # Usage examples
└── README.md              # This documentation
```

## Browser Support

- Modern browsers with ES6+ support
- React 16.8+ (hooks support required)
- Tailwind CSS for styling

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Implement the feature
3. Ensure all tests pass
4. Update documentation
5. Add examples to the demo component
