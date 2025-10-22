import React, { useState } from "react";
import TextInput from "../text-input/TextInput";
import { useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import { useNavigate } from "react-router-dom";
import { clearProuctsFromCart } from "../Cart/state/Cart.slice";
import { useDispatch } from "react-redux";
interface CheckoutFormData {
  // Billing Address
  name: string;
  email: string;
  phone: string;
  // Shipping Information
  address: string;
  city: string;
  zipCode: string;
}

const Checkout = () => {
  const { totalPrice } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange =
    (field: keyof CheckoutFormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: CheckoutFormData = {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
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

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Zip Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code (12345 or 12345-6789)";
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).some(
      (key) => newErrors[key as keyof CheckoutFormData] !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Checkout form submitted successfully!");
      dispatch(clearProuctsFromCart());
      navigate("/");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    });
  };

  return (
    <div
      data-testid="checkout-container"
      className="w-full border-1 border-gray-300 rounded-sm p-2 m-2 flex flex-col md:flex-row justify-between"
    >
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold m-4">CHECK OUT</h2>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Billing Address Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Billing Address
            </h3>
            <div className="space-y-4">
              <TextInput
                label="Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={errors.name}
                required
                id="billing-name"
              />

              <TextInput
                label="Email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={errors.email}
                required
                id="billing-email"
              />

              <TextInput
                label="Phone"
                type="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                error={errors.phone}
                required
                id="billing-phone"
              />
            </div>
          </div>

          {/* Shipping Information Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Shipping Information
            </h3>
            <div className="space-y-4">
              <TextInput
                label="Address"
                type="text"
                placeholder="Enter your street address"
                value={formData.address}
                onChange={handleInputChange("address")}
                error={errors.address}
                required
                id="shipping-address"
              />

              <TextInput
                label="City"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange("city")}
                error={errors.city}
                required
                id="shipping-city"
              />

              <TextInput
                label="Zip Code"
                type="text"
                placeholder="Enter your zip code"
                value={formData.zipCode}
                onChange={handleInputChange("zipCode")}
                error={errors.zipCode}
                required
                id="shipping-zip"
                maxLength={10}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
            >
              Complete Checkout
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
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-1/3">
        <h2 className="text-2xl font-bold m-4">Order Summary</h2>
        <div className="border border-gray-300 rounded-md p-4 m-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$30.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${totalPrice + 30}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
