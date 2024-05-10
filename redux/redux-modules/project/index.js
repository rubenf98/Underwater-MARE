import { types } from "./types";

const initialState = {
    data: [],
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.CREATE_PROJECT}_PENDING`:
        case `${types.ADD_MEMBER}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_PROJECT}_REJECTED`:
        case `${types.ADD_MEMBER}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_PROJECT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.ADD_MEMBER}_FULFILLED`:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};
