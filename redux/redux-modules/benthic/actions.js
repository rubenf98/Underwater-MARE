import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchBenthics = (page = 1, filters = {}) => ({
    type: types.FETCH_BENTHICS,
    payload: axios.get(`${url}/benthics?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchBenthicSelector = (filters = {}) => ({
    type: types.FETCH_BENTHIC_SELECTOR,
    payload: axios.get(`${url}/selector/benthics?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createBenthic = (data) => ({
    type: types.CREATE_BENTHIC,
    payload: axios.post(`${url}/benthics`, data),
});

export const updateBenthic = (id, data) => ({
    type: types.UPDATE_BENTHIC,
    payload: axios.put(`${url}/benthics/${id}`, data),
});

export const deleteBenthic = id => ({
    type: types.DELETE_BENTHIC,
    payload: axios.delete(`${url}/benthics/${id}`),
    meta: { id }
});