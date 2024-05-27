import { combineReducers } from "redux";
import auth from "./redux-modules/auth";
import contact from "./redux-modules/contact";
import project from "./redux-modules/project";
import report from "./redux-modules/report";
import locality from "./redux-modules/locality";
import user from "./redux-modules/user";
import taxa from "./redux-modules/taxa";
import indicator from "./redux-modules/indicator";
import category from "./redux-modules/category";

const rootReducer = combineReducers({
    auth,
    contact,
    project,
    report,
    locality,
    user,
    taxa,
    indicator,
    category
});

export default rootReducer;
