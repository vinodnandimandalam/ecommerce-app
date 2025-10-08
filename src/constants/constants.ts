import {
  FaTruck,
  FaHeadset,
  FaMoneyBillWave,
  FaLock,
  FaTag,
} from "react-icons/fa";

import { mensImage, womensImage, kidsImage } from "../assets/images";

export const Categories = [
  {
    id: 1,
    name: "Mens",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Womens",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Kids",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Genz",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Millennials",
    image: "https://via.placeholder.com/150",
  },
];

export const InfoOptions = [
  {
    id: 1,
    icon: FaTruck,
    title: "Free Shipping",
    description: "Get your orders delivered with no extra cost",
  },
  {
    id: 2,
    icon: FaHeadset,
    title: "Support 24/7",
    description: "We are here to assist you anytime",
  },
  {
    id: 3,
    icon: FaMoneyBillWave,
    title: "100% Money Back",
    description: "Full refund if you are not satisfied",
  },
  {
    id: 4,
    icon: FaLock,
    title: "Payment Secure",
    description: "Your payment information is safe with us",
  },
  {
    id: 5,
    icon: FaTag,
    title: "Discount",
    description: "Enjoy the best prices on our products",
  },
];

export const Categorys2 = [
  {
    id: 1,
    category: "Men",
    cta: "View All",
    image: mensImage,
  },
  {
    id: 2,
    category: "Women",
    cta: "View All",
    image: womensImage,
  },
  {
    id: 3,
    category: "Kids",
    cta: "View All",
    image: kidsImage,
  },
];

export const API_BASE_URL = "https://fakestoreapi.com";
export const PRODUCTS_URL = "/products";
