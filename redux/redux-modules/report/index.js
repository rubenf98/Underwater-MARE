import { types } from "./types";

const initialState = {
    data: [],
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.CREATE_REPORT}_PENDING`:
        case `${types.FETCH_REPORTS}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_REPORT}_REJECTED`:
        case `${types.FETCH_REPORTS}_REJECTED`:
            return {
                ...state,
                loading: false,
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

        default:
            return state;
    }
};
