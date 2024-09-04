import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";

export const fetchPermissions = (project) => ({
  type: types.FETCH_PERMISSIONS,
  payload: axiosConfig.get(`/permissions/${project}`),
});
