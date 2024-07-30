import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchMotiles = (page = 1, filters = {}) => ({
    type: types.FETCH_MOTILES,
    payload: axios.get(`${url}/motiles?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorMotiles = (filters = {}) => ({
    type: types.FETCH_MOTILE_SELECTOR,
    payload: axios.get(`${url}/selector/motiles?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createMotile = (data) => ({
    type: types.CREATE_MOTILE,
    payload: axios.post(`${url}/motiles`, data),
});

export const updateMotile = (id, data) => ({
    type: types.UPDATE_MOTILE,
    payload: axios.put(`${url}/motiles/${id}`, data),
});

export const deleteMotile = id => ({
    type: types.DELETE_MOTILE,
    payload: axios.delete(`${url}/motiles/${id}`),
    meta: { id }
});