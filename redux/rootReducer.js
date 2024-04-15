import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import contact from "./redux-modules/contact";

const rootReducer = combineReducers({
  auth,
  contact,
});

export default rootReducer;
