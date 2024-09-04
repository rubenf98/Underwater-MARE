import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchSubstrates = (page = 1, filters = {}) => ({
    type: types.FETCH_SUBSTRATES,
    payload: axiosConfig.get(`/substrates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorSubstrates = (filters = {}) => ({
    type: types.FETCH_SUBSTRATE_SELECTOR,
    payload: axiosConfig.get(`/selector/substrates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createSubstrate = (data) => ({
    type: types.CREATE_SUBSTRATE,
    payload: axiosConfig.post(`/substrates`, data),
});

export const updateSubstrate = (id, data) => ({
    type: types.UPDATE_SUBSTRATE,
    payload: axiosConfig.put(`/substrates/${id}`, data),
});

export const deleteSubstrate = id => ({
    type: types.DELETE_SUBSTRATE,
    payload: axiosConfig.delete(`/substrates/${id}`),
    meta: { id }
});