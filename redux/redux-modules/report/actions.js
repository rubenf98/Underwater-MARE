import { types } from "./types";
import axios from "axios";
import queryString from "query-string";


const url = `${import.meta.env.VITE_API}/api`;

export const fetchReports = (page = 1, filters = {}) => ({
    type: types.FETCH_REPORTS,
    payload: axios.get(`${window.location.origin}/api/uwsurvey/reports?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});

export const createProject = (data) => ({
    type: types.CREATE_PROJECT,
    payload: axios.post(`${url}/project`, data),
});


export const addMember = (data) => ({
    type: types.ADD_MEMBER,
    payload: axios.post(`${url}/project/add-member`, data),
});