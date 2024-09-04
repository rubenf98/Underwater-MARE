import axiosConfig from "../../../src/axiosConfig";

const createContact = (data) => axiosConfig.post(`/contact`, data);

const api = {
    createContact,
};

export default api;
