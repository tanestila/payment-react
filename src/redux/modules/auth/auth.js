import { types } from "./types";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  isCredentialsExpired: false,
  isCredentialsExpires: false,
  isInitialized: false,
  isFirstTimeLogin: false,
  username: "",
  loginGuid: "",
  permissions: [],
  error: "",
  loading: false,
  otpAuth: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        isInitialized: action.isInitialized,
        isLoggedIn: action.isLoggedIn,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        error: action.error,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        username: action.username,
        isCredentialsExpired: action.credentials_expired,
        isCredentialsExpires: action.credentials_expire_after ? true : false,
        isFirstTimeLogin: action.first_time_login,
        otpAuth: false,
      };

    case types.SET_PRIVILEGES:
      return {
        ...state,
        isAdmin: action.isAdmin,
        permissions: action.permissions,
        loginGuid: action.loginGuid,
      };

    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.message,
        isLoggedIn: false,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
        isLoggedIn: false,
        isCredentialsExpired: false,
        isCredentialsExpires: false,
        isInitialized: true,
        isFirstTimeLogin: false,
        username: "",
        loginGuid: "",
        permissions: [],
        error: "",
      };

    case types.OTP_AUTH:
      return {
        ...state,
        otpAuth: true,
      };

    default:
      return { ...state };
  }
}

export const LoginSuccessAC = () => ({
  type: types.LOGIN_SUCCESS,
});

export const LoginFailAC = () => ({
  type: types.LOGIN_FAIL,
});
