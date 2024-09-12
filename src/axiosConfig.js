import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Set the default content type
    "ngrok-skip-browser-warning": "testing",
  },
});

export default axiosConfig;
