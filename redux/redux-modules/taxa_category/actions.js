import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchTaxaCategories = (page = 1, filters = {}) => ({
    type: types.FETCH_CATEGORIES,
    payload: axiosConfig.get(`/taxa_categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorTaxaCategories = (filters = {}) => ({
    type: types.FETCH_SELECTOR_CATEGORIES,
    payload: axiosConfig.get(`/selector/taxa_categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createTaxaCategory = (data) => ({
    type: types.CREATE_CATEGORY,
    payload: axiosConfig.post(`/taxa_categories`, data),
});

export const updateTaxaCategory = (id, data) => ({
    type: types.UPDATE_CATEGORY,
    payload: axiosConfig.put(`/taxa_categories/${id}`, data),
});

export const deleteTaxaCategory = id => ({
    type: types.DELETE_CATEGORY,
    payload: axiosConfig.delete(`/taxa_categories/${id}`),
    meta: { id }
});