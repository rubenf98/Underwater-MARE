import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchDepths = (page = 1, filters = {}) => ({
    type: types.FETCH_DEPTHS,
    payload: axiosConfig.get(`/depths?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorDepths = (filters = {}) => ({
    type: types.FETCH_SELECTOR_DEPTHS,
    payload: axiosConfig.get(`/selector/depths?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createDepth = (data) => ({
    type: types.CREATE_DEPTH,
    payload: axiosConfig.post(`/depths`, data),
});

export const updateDepth = (id, data) => ({
    type: types.UPDATE_DEPTH,
    payload: axiosConfig.put(`/depths/${id}`, data),
});

export const deleteDepth = id => ({
    type: types.DELETE_DEPTH,
    payload: axiosConfig.delete(`/depths/${id}`),
    meta: { id }
});