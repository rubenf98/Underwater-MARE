import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchDepths = (page = 1, filters = {}) => ({
    type: types.FETCH_DEPTHS,
    payload: axios.get(`${url}/depths?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorDepths = (filters = {}) => ({
    type: types.FETCH_SELECTOR_DEPTHS,
    payload: axios.get(`${url}/selector/depths?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createDepth = (data) => ({
    type: types.CREATE_DEPTH,
    payload: axios.post(`${url}/depths`, data),
});

export const updateDepth = (id, data) => ({
    type: types.UPDATE_DEPTH,
    payload: axios.put(`${url}/depths/${id}`, data),
});

export const deleteDepth = id => ({
    type: types.DELETE_DEPTH,
    payload: axios.delete(`${url}/depths/${id}`),
    meta: { id }
});