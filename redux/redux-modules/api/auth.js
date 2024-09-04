import axiosConfig from "../../../src/axiosConfig";

const createUser = (data) => axiosConfig.post(`/register`, data);

const login = (data) => axiosConfig.post(`${import.meta.env.VITE_API}/api/login`, data);

const updateProfilePicture = (id, data) =>
  axiosConfig.post(`/profile-picture/${id}`, data);

const api = {
  createUser,
  login,
  updateProfilePicture,
};

export default api;
