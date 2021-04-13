import { combineReducers } from "redux";
import { authReducer } from "./auth/auth";

export default combineReducers({
  auth: authReducer,
});
