import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";



export const fetchSelectorSizeCategories = (filters = {}) => ({
    type: types.FETCH_SELECTOR_SIZE_CATEGORIES,
    payload: axiosConfig.get(`/selector/size_categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
});

