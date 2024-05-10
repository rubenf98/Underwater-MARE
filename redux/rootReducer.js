import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import contact from "./redux-modules/contact";
import project from "./redux-modules/project";
import report from "./redux-modules/report";

const rootReducer = combineReducers({
    auth,
    contact,
    project,
    report
});

export default rootReducer;
