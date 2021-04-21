import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { userProfileReducer } from "./userprofile";
import { tableReducer } from "./table";

export default combineReducers({
  auth: authReducer,
  userprofile: userProfileReducer,
  table: tableReducer,
});
