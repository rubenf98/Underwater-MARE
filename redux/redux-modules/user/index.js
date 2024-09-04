import { types } from "./types";

const initialState = {
  data: [],
  meta: {},
  currentUser: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_USERS}_PENDING`:
    case `${types.UPDATE_MEMBER}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_USERS}_REJECTED`:
    case `${types.UPDATE_MEMBER}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_USERS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };
    case `${types.UPDATE_MEMBER}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.data.data.id
            ? action.payload.data.data
            : record
        ),
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
