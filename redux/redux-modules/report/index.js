import { types } from "./types";

const initialState = {
    data: [],
    coordinates: [],
    selector: [],
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.CREATE_REPORT}_PENDING`:
        case `${types.FETCH_REPORTS}_PENDING`:
        case `${types.UPDATE_REPORT}_PENDING`:
        case `${types.DELETE_REPORT}_PENDING`:
        case `${types.FETCH_REPORT_COORDINATES}_PENDING`:
        case `${types.FETCH_SELECTOR_REPORTS}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_REPORT}_REJECTED`:
        case `${types.FETCH_REPORTS}_REJECTED`:
        case `${types.UPDATE_REPORT}_REJECTED`:
        case `${types.DELETE_REPORT}_REJECTED`:
        case `${types.FETCH_REPORT_COORDINATES}_REJECTED`:
        case `${types.FETCH_SELECTOR_REPORTS}_PENDING`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_SELECTOR_REPORTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_REPORT_COORDINATES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                coordinates: action.payload.data,
            };

        case `${types.CREATE_REPORT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.FETCH_REPORTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta
            };

        case `${types.DELETE_REPORT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(record => record.id !== action.meta.id)
            };

        case `${types.UPDATE_REPORT}_FULFILLED`:
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
