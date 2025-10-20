# Modal Component

A reusable React Modal component built with `react-modal` that provides a flexible and accessible modal dialog.

## Features

- ✅ Fully accessible with ARIA attributes
- ✅ Customizable close and submit buttons
- ✅ Optional callback functions for close/submit actions
- ✅ Responsive design with overlay
- ✅ Comprehensive test coverage
- ✅ TypeScript support

## Installation

Make sure you have `react-modal` installed:

```bash
npm install react-modal
npm install @types/react-modal --save-dev
```

## Usage

### Basic Usage

```tsx
import React, { useState } from "react";
import Modal from "./Modal";

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div>
          <h2>Modal Title</h2>
          <p>Your modal content goes here.</p>
        </div>
      </Modal>
    </div>
  );
};
```

### Advanced Usage with Callbacks

```tsx
import React, { useState } from "react";
import Modal from "./Modal";

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    console.log("Modal was closed");
    // Add any cleanup logic here
  };

  const handleSubmit = () => {
    console.log("Modal was submitted");
    // Add any submit logic here
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      >
        <div>
          <h2>Modal Title</h2>
          <p>Your modal content goes here.</p>
        </div>
      </Modal>
    </div>
  );
};
```

### Custom Modal (No Default Buttons)

```tsx
import React, { useState } from "react";
import Modal from "./Modal";

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Custom Modal</button>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showCloseButton={false}
        showSubmitButton={false}
      >
        <div>
          <h2>Custom Modal</h2>
          <p>This modal has no default buttons.</p>
          <div>
            <button onClick={() => setIsModalOpen(false)}>Custom Close</button>
            <button
              onClick={() => {
                alert("Custom action!");
                setIsModalOpen(false);
              }}
            >
              Custom Action
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
```

## Props

| Prop               | Type                             | Default | Description                                                     |
| ------------------ | -------------------------------- | ------- | --------------------------------------------------------------- |
| `children`         | `React.ReactNode`                | -       | The content to display inside the modal                         |
| `isModalOpen`      | `boolean`                        | -       | Controls whether the modal is open or closed                    |
| `setIsModalOpen`   | `(isModalOpen: boolean) => void` | -       | Function to update the modal's open state                       |
| `showCloseButton`  | `boolean`                        | `true`  | Whether to show the default close button                        |
| `showSubmitButton` | `boolean`                        | `true`  | Whether to show the default submit button                       |
| `onClose`          | `() => void`                     | -       | Optional callback function called when modal is closed          |
| `onSubmit`         | `() => void`                     | -       | Optional callback function called when submit button is clicked |

## Testing

The Modal component comes with comprehensive tests covering:

- ✅ Rendering children content
- ✅ Opening and closing behavior
- ✅ Button interactions
- ✅ Callback functions
- ✅ Conditional button rendering
- ✅ Complex content structures
- ✅ Accessibility features

Run the tests:

```bash
npm test -- --testPathPatterns=Modal.test.tsx
```

## Setup Requirements

Make sure to configure `react-modal` in your test setup file (`setupTests.ts`):

```typescript
import "@testing-library/jest-dom";
import Modal from "react-modal";

// Configure react-modal for testing
Modal.setAppElement(document.createElement("div"));
```

## Styling

The modal comes with default styling that includes:

- Semi-transparent overlay background
- Centered modal content
- White background with rounded corners
- Proper z-index layering
- Responsive design

You can customize the styling by modifying the `style` prop in the Modal component.

## Accessibility

The modal is built with accessibility in mind:

- Uses `role="dialog"` for screen readers
- Proper ARIA labels for buttons
- Focus management
- Escape key support
- Click outside to close functionality

## Demo

Check out `ModalDemo.tsx` for a complete example of how to use the Modal component with different configurations.

## File Structure

```
src/components/modal/
├── Modal.tsx          # Main modal component
├── Modal.test.tsx     # Comprehensive tests
├── ModalDemo.tsx      # Usage examples
└── README.md          # This documentation
```
