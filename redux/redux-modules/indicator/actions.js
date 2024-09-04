import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchIndicators = (page = 1, filters = {}) => ({
    type: types.FETCH_INDICATORS,
    payload: axiosConfig.get(`/indicators?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchIndicatorSelector = (filters = {}) => ({
    type: types.FETCH_INDICATOR_SELECTOR,
    payload: axiosConfig.get(`/selector/indicators?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createIndicator = (data) => ({
    type: types.CREATE_INDICATOR,
    payload: axiosConfig.post(`/indicators`, data),
});

export const updateIndicator = (id, data) => ({
    type: types.UPDATE_INDICATOR,
    payload: axiosConfig.put(`/indicators/${id}`, data),
});

export const deleteIndicator = id => ({
    type: types.DELETE_INDICATOR,
    payload: axiosConfig.delete(`/indicators/${id}`),
    meta: { id }
});