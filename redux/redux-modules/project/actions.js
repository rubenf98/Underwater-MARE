import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;

export const fetchSelfProjects = () => ({
    type: types.FETCH_SELF_PROJECTS,
    payload: axios.get(`${url}/self-projects`),
});


export const fetchProjectStatistics = (id) => ({
    type: types.FETCH_PROJECT_STATISTICS,
    payload: axios.get(`${url}/project-statistics/${id}`),
});

export const fetchProjects = (filters = {}) => ({
    type: types.FETCH_PROJECTS,
    payload: axios.get(`${url}/projects?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

export const createProject = (data) => ({
    type: types.CREATE_PROJECT,
    payload: axios.post(`${url}/projects`, data),
});

export const updateProject = (id, data) => ({
    type: types.UPDATE_PROJECT,
    payload: axios.put(`${url}/projects/${id}`, data),
});

export const deleteProject = id => ({
    type: types.DELETE_PROJECT,
    payload: axios.delete(`${url}/projects/${id}`),
    meta: { id }
});

export const fetchProjectInvites = () => ({
    type: types.FETCH_PROJECT_INVITES,
    payload: axios.get(`${url}/invites`),
});


export const inviteMember = (data) => ({
    type: types.INVITE_MEMBER,
    payload: axios.post(`${url}/invite-member`, data),
});

export const respondToInvite = (id, data) => ({
    type: types.RESPOND_TO_INVITE,
    payload: axios.put(`${url}/accept-member/${id}`, data),
});