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

export const createProject = (data) => ({
    type: types.CREATE_REPORT,
    payload: axios.post(`${url}/project`, data),
});
