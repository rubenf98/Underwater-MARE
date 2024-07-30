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
import depth from "./redux-modules/depth";
import _function from "./redux-modules/function";
import benthic from "./redux-modules/benthic";
import substrate from "./redux-modules/substrate";
import motile from "./redux-modules/motile";

const rootReducer = combineReducers({
    auth,
    contact,
    project,
    report,
    locality,
    user,
    taxa,
    indicator,
    category,
    depth,
    _function,
    benthic,
    substrate,
    motile
});

export default rootReducer;
