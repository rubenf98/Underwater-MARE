import { types } from "./types";

const initialState = {
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.CREATE_CONTACT}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.CREATE_CONTACT}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.CREATE_CONTACT}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
