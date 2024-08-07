import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

const url = `${import.meta.env.VITE_API}/api/underwater-survey`;


export const fetchSelectorSizeCategories = (filters = {}) => ({
    type: types.FETCH_SELECTOR_SIZE_CATEGORIES,
    payload: axios.get(`${url}/selector/size_categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

