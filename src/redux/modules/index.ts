import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { userProfileReducer } from "./userprofile";
import { routerReducer } from "./router";
import { sidebarReducer } from "./sidebar";
import { tableReducer } from "./table";

export default combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  userprofile: userProfileReducer,
  router: routerReducer,
  table: tableReducer,
});
