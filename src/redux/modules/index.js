import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";
import { merchantReducer } from "./merchant";
import { userProfileReducer } from "./userprofile";

export default combineReducers({
  auth: authReducer,
  merchant: merchantReducer,
  userprofile: userProfileReducer,
});
