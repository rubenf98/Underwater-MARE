import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchLocalities = (page = 1, filters = {}) => ({
    type: types.FETCH_LOCALITIES,
    payload: axiosConfig.get(`/localities?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorLocalities = (filters = {}) => ({
    type: types.FETCH_SELECTOR_LOCALITIES,
    payload: axiosConfig.get(`/selector/localities?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createLocality = (data) => ({
    type: types.CREATE_LOCALITY,
    payload: axiosConfig.post(`/localities`, data),
});

export const updateLocality = (id, data) => ({
    type: types.UPDATE_LOCALITY,
    payload: axiosConfig.put(`/localities/${id}`, data),
});

export const deleteLocality = id => ({
    type: types.DELETE_LOCALITY,
    payload: axiosConfig.delete(`/localities/${id}`),
    meta: { id }
});