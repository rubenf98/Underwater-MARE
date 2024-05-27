import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchCategories = (page = 1, filters = {}) => ({
    type: types.FETCH_CATEGORIES,
    payload: axios.get(`${url}/categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorCategories = (filters = {}) => ({
    type: types.FETCH_SELECTOR_CATEGORIES,
    payload: axios.get(`${url}/selector/categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createCategory = (data) => ({
    type: types.CREATE_CATEGORY,
    payload: axios.post(`${url}/categories`, data),
});

export const updateCategory = (id, data) => ({
    type: types.UPDATE_CATEGORY,
    payload: axios.put(`${url}/categories/${id}`, data),
});

export const deleteCategory = id => ({
    type: types.DELETE_CATEGORY,
    payload: axios.delete(`${url}/categories/${id}`),
    meta: { id }
});