import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSelfProjects = () => ({
  type: types.FETCH_SELF_PROJECTS,
  payload: axiosConfig.get(`/self-projects`),
});

export const fetchProjectStatistics = (id) => ({
  type: types.FETCH_PROJECT_STATISTICS,
  payload: axiosConfig.get(`/project-statistics/${id}`),
});

export const fetchProjects = (filters = {}) => ({
  type: types.FETCH_PROJECTS,
  payload: axiosConfig.get(
    `/projects?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createProject = (data) => ({
  type: types.CREATE_PROJECT,
  payload: axiosConfig.post(`/projects`, data),
});

export const updateProject = (id, data) => ({
  type: types.UPDATE_PROJECT,
  payload: axiosConfig.put(`/projects/${id}`, data),
});

export const deleteProject = (id) => ({
  type: types.DELETE_PROJECT,
  payload: axiosConfig.delete(`/projects/${id}`),
  meta: { id },
});

export const fetchProjectInvites = () => ({
  type: types.FETCH_PROJECT_INVITES,
  payload: axiosConfig.get(`/invites`),
});

export const inviteMember = (data) => ({
  type: types.INVITE_MEMBER,
  payload: axiosConfig.post(`/invite-member`, data),
});

export const respondToInvite = (id, data) => ({
  type: types.RESPOND_TO_INVITE,
  payload: axiosConfig.put(`/accept-member/${id}`, data),
});

