import { types } from "./types";
import axios from "axios";
import queryString from "query-string";


const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchReports = (page = 1, filters = {}) => ({
    type: types.FETCH_REPORTS,
    payload: axios.get(`${url}/reports?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const fetchSelectorReports = (filters = {}) => ({
    type: types.FETCH_SELECTOR_REPORTS,
    payload: axios.get(`${url}/selector/reports?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const fetchReportCoordinates = (limit = 100) => ({
    type: types.FETCH_REPORT_COORDINATES,
    payload: axios.get(`${url}/selector/report-coordinates?limit=${limit}`)
});


export const createReport = (data) => ({
    type: types.CREATE_REPORT,
    payload: axios.post(`${url}/reports`, data),
});

export const updateReport = (id, data) => ({
    type: types.UPDATE_REPORT,
    payload: axios.put(`${url}/reports/${id}`, data),
});

export const deleteReport = id => ({
    type: types.DELETE_REPORT,
    payload: axios.delete(`${url}/reports/${id}`),
    meta: { id }
});