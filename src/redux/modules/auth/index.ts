import { types } from "./types";

const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  isCredentialsExpired: false,
  isCredentialsExpires: false,
  isFirstTimeLogin: false,
  accessToken: "",
  refreshToken: "",
  loginGuid: "",
  loading: false,
  otpAuth: false,
  status: "",
  error: "",
};

type AuthStateType = typeof initialState;

export function authReducer(state: AuthStateType = initialState, action: any) {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        isInitialized: action.isInitialized,
        isLoggedIn: action.isLoggedIn,
        error: action.error,
        username: action.username,
        isCredentialsExpired: action.credentials_expired,
        isCredentialsExpires: action.credentials_expire_after ? true : false,
        isFirstTimeLogin: action.first_time_login,
        loginGuid: action.loginGuid,
      };

    case types.SET_TOKENS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };

    case types.SET_PRIVILEGES:
      return {
        ...state,
        permissions: action.permissions,
        loginGuid: action.loginGuid,
        role: action.role,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        otpAuth: false,
      };

    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.message,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case types.LOGOUT:
      return {
        ...state,
        status: "",
        error: "",
        isInitialized: true,
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
        loading: false,
        otpAuth: false,
      };

    case types.FLUSH_TOKEN:
      return {
        ...state,
        status: "",
        error: action.error,
        isInitialized: true,
        isLoggedIn: false,
        accessToken: "",
        refreshToken: "",
        loading: false,
        otpAuth: false,
        isCredentialsExpired: false,
        isCredentialsExpires: false,
        isFirstTimeLogin: false,
        loginGuid: "",
      };

    case types.OTP_AUTH:
      return {
        ...state,
        otpAuth: true,
        status: action.status,
      };

    default:
      return { ...state };
  }
}
