import { types } from "./types";
import axios from "axios";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchSelfProjects = () => ({
    type: types.FETCH_SELF_PROJECTS,
    payload: axios.get(`${url}/self-projects`),
});


export const fetchProjectStatistics = (id) => ({
    type: types.FETCH_PROJECT_STATISTICS,
    payload: axios.get(`${url}/project-statistics/${id}`),
});

export const createProject = (data) => ({
    type: types.CREATE_PROJECT,
    payload: axios.post(`${url}/projects`, data),
});


export const addMember = (data) => ({
    type: types.ADD_MEMBER,
    payload: axios.post(`${url}/projects/add-member`, data),
});