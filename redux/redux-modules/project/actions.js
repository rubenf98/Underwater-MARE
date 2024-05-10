import { types } from "./types";
const url = `${import.meta.env.VITE_API}/api`;
import axios from "axios";

export const createProject = (data) => ({
    type: types.CREATE_PROJECT,
    payload: axios.post(`${url}/project`, data),
});


export const addMember = (data) => ({
    type: types.ADD_MEMBER,
    payload: axios.post(`${url}/project/add-member`, data),
});