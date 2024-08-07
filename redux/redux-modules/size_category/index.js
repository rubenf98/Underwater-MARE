import { types } from "./types";

const initialState = {
  data: [],
  selector: [],
  meta: {},
  current: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELECTOR_SIZE_CATEGORIES}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELECTOR_SIZE_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    default:
      return state;
  }
};
