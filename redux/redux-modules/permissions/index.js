import { types } from "./types";

const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_PERMISSIONS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${types.FETCH_PERMISSIONS}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_PERMISSIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.permissions,
      };

    default:
      return state;
  }
};
