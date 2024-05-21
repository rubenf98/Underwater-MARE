import { types } from "./types";

const initialState = {
    data: [],
    meta: {},
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_TAXAS}_PENDING`:
        case `${types.CREATE_TAXA}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_TAXAS}_REJECTED`:
        case `${types.CREATE_TAXA}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_TAXAS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta
            };

        case `${types.CREATE_TAXA}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        default:
            return state;
    }
};
