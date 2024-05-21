import { types } from "./types";

const initialState = {
    data: [],
    meta: {},
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_USERS}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_USERS}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_USERS}_FULFILLED`:
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
