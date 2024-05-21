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

export const createTaxa = (data) => ({
    type: types.CREATE_TAXA,
    payload: axios.post(`${url}/taxas`, data),
});