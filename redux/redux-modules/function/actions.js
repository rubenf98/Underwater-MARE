import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchFunctions = (page = 1, filters = {}) => ({
    type: types.FETCH_FUNCTIONS,
    payload: axios.get(`${url}/functions?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorFunctions = (filters = {}) => ({
    type: types.FETCH_SELECTOR_FUNCTIONS,
    payload: axios.get(`${url}/selector/functions?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createFunction = (data) => ({
    type: types.CREATE_FUNCTION,
    payload: axios.post(`${url}/functions`, data),
});

export const updateFunction = (id, data) => ({
    type: types.UPDATE_FUNCTION,
    payload: axios.put(`${url}/functions/${id}`, data),
});

export const deleteFunction = id => ({
    type: types.DELETE_FUNCTION,
    payload: axios.delete(`${url}/functions/${id}`),
    meta: { id }
});