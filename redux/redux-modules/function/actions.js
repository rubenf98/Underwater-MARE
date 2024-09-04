import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchFunctions = (page = 1, filters = {}) => ({
    type: types.FETCH_FUNCTIONS,
    payload: axiosConfig.get(`/functions?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorFunctions = (filters = {}) => ({
    type: types.FETCH_SELECTOR_FUNCTIONS,
    payload: axiosConfig.get(`/selector/functions?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createFunction = (data) => ({
    type: types.CREATE_FUNCTION,
    payload: axiosConfig.post(`/functions`, data),
});

export const updateFunction = (id, data) => ({
    type: types.UPDATE_FUNCTION,
    payload: axiosConfig.put(`/functions/${id}`, data),
});

export const deleteFunction = id => ({
    type: types.DELETE_FUNCTION,
    payload: axiosConfig.delete(`/functions/${id}`),
    meta: { id }
});