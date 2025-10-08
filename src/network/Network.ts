import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const getRequest = async (url: string) => {
  const response = await axios.get(`${API_BASE_URL}${url}`);
  return response.data;
};
