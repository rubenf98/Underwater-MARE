import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchBenthics = (page = 1, filters = {}) => ({
    type: types.FETCH_BENTHICS,
    payload: axiosConfig.get(`/benthics?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchBenthicSelector = (filters = {}) => ({
    type: types.FETCH_BENTHIC_SELECTOR,
    payload: axiosConfig.get(`/selector/benthics?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createBenthic = (data) => ({
    type: types.CREATE_BENTHIC,
    payload: axiosConfig.post(`/benthics`, data),
});

export const updateBenthic = (id, data) => ({
    type: types.UPDATE_BENTHIC,
    payload: axiosConfig.put(`/benthics/${id}`, data),
});

export const deleteBenthic = id => ({
    type: types.DELETE_BENTHIC,
    payload: axiosConfig.delete(`/benthics/${id}`),
    meta: { id }
});