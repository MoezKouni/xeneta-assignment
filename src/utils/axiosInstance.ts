import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
  }, 
});

export default axiosInstance;