import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

interface RatesArg {
    origin: string;
    destination: string;
};

export const fetchRates = async ({origin, destination}: RatesArg) => {
  try {
    const response = await axiosInstance({
      url: `/rates?origin=${origin}&destination=${destination}`,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.log((error.response?.data).error);
    }
    throw new Error()
  }
};
