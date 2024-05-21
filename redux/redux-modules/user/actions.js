import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api`;

export const fetchUsers = (page = 1, filters = {}) => ({
    type: types.FETCH_USERS,
    payload: axios.get(`${url}/user?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
});