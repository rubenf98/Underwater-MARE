import axios from "axios";

const url = `${import.meta.env.VITE_API}/api`;

const createContact = (data) => axios.post(`${url}/contact`, data);

const api = {
  createContact,
};

export default api;
