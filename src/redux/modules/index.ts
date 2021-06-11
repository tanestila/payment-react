import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { userProfileReducer } from "./userprofile";
import { tableReducer } from "./table";
import { sidebarReducer } from "./sidebar";

export default combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  userprofile: userProfileReducer,
});
