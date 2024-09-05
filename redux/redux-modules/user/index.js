import { types } from "./types";

const initialState = {
  data: [],
  meta: {},
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
    default:
      return state;
  }
};
