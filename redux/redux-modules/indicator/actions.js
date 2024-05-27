import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchIndicators = (page = 1, filters = {}) => ({
    type: types.FETCH_INDICATORS,
    payload: axios.get(`${url}/indicators?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchIndicatorSelector = (filters = {}) => ({
    type: types.FETCH_INDICATOR_SELECTOR,
    payload: axios.get(`${url}/selector/indicators?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createIndicator = (data) => ({
    type: types.CREATE_INDICATOR,
    payload: axios.post(`${url}/indicators`, data),
});

export const updateIndicator = (id, data) => ({
    type: types.UPDATE_INDICATOR,
    payload: axios.put(`${url}/indicators/${id}`, data),
});

export const deleteIndicator = id => ({
    type: types.DELETE_INDICATOR,
    payload: axios.delete(`${url}/indicators/${id}`),
    meta: { id }
});