import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { merchantReducer } from "./merchant";
import { userProfileReducer } from "./userprofile";
import { tableReducer } from "./table";

export default combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  userprofile: userProfileReducer,
  table: tableReducer,
});
