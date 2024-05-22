import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchLocalities = (page = 1, filters = {}) => ({
    type: types.FETCH_LOCALITIES,
    payload: axios.get(`${url}/localities?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const createLocality = (data) => ({
    type: types.CREATE_LOCALITY,
    payload: axios.post(`${url}/localities`, data),
});

export const updateLocality = (id, data) => ({
    type: types.UPDATE_LOCALITY,
    payload: axios.put(`${url}/localities/${id}`, data),
});

export const deleteLocality = id => ({
    type: types.DELETE_LOCALITY,
    payload: axios.delete(`${url}/localities/${id}`),
    meta: { id }
});