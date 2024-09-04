import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchMotiles = (page = 1, filters = {}) => ({
    type: types.FETCH_MOTILES,
    payload: axiosConfig.get(`/motiles?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorMotiles = (filters = {}) => ({
    type: types.FETCH_MOTILE_SELECTOR,
    payload: axiosConfig.get(`/selector/motiles?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createMotile = (data) => ({
    type: types.CREATE_MOTILE,
    payload: axiosConfig.post(`/motiles`, data),
});

export const updateMotile = (id, data) => ({
    type: types.UPDATE_MOTILE,
    payload: axiosConfig.put(`/motiles/${id}`, data),
});

export const deleteMotile = id => ({
    type: types.DELETE_MOTILE,
    payload: axiosConfig.delete(`/motiles/${id}`),
    meta: { id }
});