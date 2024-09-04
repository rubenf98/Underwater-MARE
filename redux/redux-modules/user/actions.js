import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `projects/members?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const updateMember = (id, userId, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(
    `projects/${id}/members/${userId}?project=${id}`,
    data
  ),
});

export const setCurrentUser = (record) => ({
  type: types.SET_CURRENT_USER,
  payload: record,
});
