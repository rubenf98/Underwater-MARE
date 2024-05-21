import { types } from "./types";

const initialState = {
    data: [],
    selfData: [],
    statistics: { members: 0, report: 0, sites: 0, taxa: 0 },
    current: {},
    loading: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_SELF_PROJECTS}_PENDING`:
        case `${types.CREATE_PROJECT}_PENDING`:
        case `${types.ADD_MEMBER}_PENDING`:
        case `${types.FETCH_PROJECT_STATISTICS}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_SELF_PROJECTS}_REJECTED`:
        case `${types.CREATE_PROJECT}_REJECTED`:
        case `${types.ADD_MEMBER}_REJECTED`:
        case `${types.FETCH_PROJECT_STATISTICS}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.FETCH_PROJECT_STATISTICS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                statistics: action.payload.data.data
            };

        case `${types.FETCH_SELF_PROJECTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selfData: action.payload.data.data
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
