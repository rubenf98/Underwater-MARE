import { types } from "./types";

const initialState = {
    data: [],
    selector: [],
    meta: {},
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_CATEGORIES}_PENDING`:
        case `${types.FETCH_SELECTOR_CATEGORIES}_PENDING`:
        case `${types.CREATE_CATEGORY}_PENDING`:
        case `${types.DELETE_CATEGORY}_PENDING`:
        case `${types.UPDATE_CATEGORY}_PENDING`:

            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_CATEGORIES}_REJECTED`:
        case `${types.FETCH_SELECTOR_CATEGORIES}_PENDING`:
        case `${types.CREATE_CATEGORY}_REJECTED`:
        case `${types.DELETE_CATEGORY}_REJECTED`:
        case `${types.UPDATE_CATEGORY}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_SELECTOR_CATEGORIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_CATEGORIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta
            };

        case `${types.CREATE_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.DELETE_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(record => record.id !== action.meta.id)
            };

        case `${types.UPDATE_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map((record) =>
                    record.id === action.payload.data.data.id
                        ? action.payload.data.data
                        : record
                )
            };

        default:
            return state;
    }
};
