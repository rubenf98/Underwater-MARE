import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchTaxas = (page = 1, filters = {}) => ({
    type: types.FETCH_TAXAS,
    payload: axios.get(`${url}/taxas?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorTaxas = (filters = {}) => ({
    type: types.FETCH_SELECTOR_TAXAS,
    payload: axios.get(`${url}/selector/taxa-categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});


export const createTaxa = (data) => ({
    type: types.CREATE_TAXA,
    payload: axios.post(`${url}/taxas`, data),
});

export const updateTaxa = (id, data) => ({
    type: types.UPDATE_TAXA,
    payload: axios.put(`${url}/taxas/${id}`, data),
});

export const deleteTaxa = id => ({
    type: types.DELETE_TAXA,
    payload: axios.delete(`${url}/taxas/${id}`),
    meta: { id }
});