import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
});

export default axiosInstance;
