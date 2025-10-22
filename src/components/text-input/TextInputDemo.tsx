import React, { useState } from "react";
import TextInput from "./TextInput";

const TextInputDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneNumbers = formData.phone.replace(/\D/g, "");
      if (phoneNumbers.length < 10) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("Form data:", formData);
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        TextInput Component Demo
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <TextInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange("name")}
            error={errors.name}
            required
            id="name"
          />

          {/* Email Input */}
          <TextInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            required
            id="email"
          />

          {/* Phone Input */}
          <TextInput
            label="Phone Number"
            type="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            error={errors.phone}
            required
            id="phone"
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            required
            id="password"
          />
        </div>

        {/* Address Input */}
        <TextInput
          label="Address"
          type="text"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleInputChange("address")}
          error={errors.address}
          required
          id="address"
        />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Submit Form
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Feature Showcase */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Feature Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disabled Input */}
          <TextInput
            label="Disabled Input"
            type="text"
            defaultValue="This input is disabled"
            disabled
            id="disabled"
          />

          {/* Input with Custom Class */}
          <TextInput
            label="Custom Styled Input"
            type="text"
            placeholder="Custom styling applied"
            className="border-purple-500 focus:ring-purple-500"
            id="custom"
          />

          {/* Input with Max Length */}
          <TextInput
            label="Limited Length Input"
            type="text"
            placeholder="Max 10 characters"
            maxLength={10}
            id="maxlength"
          />

          {/* Input without Label */}
          <TextInput
            type="text"
            placeholder="Input without label"
            id="nolabel"
          />
        </div>
      </div>

      {/* Phone Number Examples */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Phone Number Formatting Examples
        </h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            Try typing these numbers to see the formatting:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • <code>1234567890</code> → <code>(123) 456-7890</code>
            </li>
            <li>
              • <code>11234567890</code> → <code>+1 (123) 456-7890</code>
            </li>
            <li>
              • <code>123</code> → <code>(123</code>
            </li>
            <li>
              • <code>123456</code> → <code>(123) 456</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextInputDemo;
