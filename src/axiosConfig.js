import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api/underwater-survey`, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
});

export default axiosConfig;
