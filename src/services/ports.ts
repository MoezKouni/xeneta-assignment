import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const fetchPorts = async () => {
  try {
    const response = await axiosInstance({
      url: "/ports",
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Is this the correct way?
      console.log((error.response?.data).error);
    }
  }
};
