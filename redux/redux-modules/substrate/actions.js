import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchSubstrates = (page = 1, filters = {}) => ({
    type: types.FETCH_SUBSTRATES,
    payload: axios.get(`${url}/substrates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorSubstrates = (filters = {}) => ({
    type: types.FETCH_SUBSTRATE_SELECTOR,
    payload: axios.get(`${url}/selector/substrates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createSubstrate = (data) => ({
    type: types.CREATE_SUBSTRATE,
    payload: axios.post(`${url}/substrates`, data),
});

export const updateSubstrate = (id, data) => ({
    type: types.UPDATE_SUBSTRATE,
    payload: axios.put(`${url}/substrates/${id}`, data),
});

export const deleteSubstrate = id => ({
    type: types.DELETE_SUBSTRATE,
    payload: axios.delete(`${url}/substrates/${id}`),
    meta: { id }
});