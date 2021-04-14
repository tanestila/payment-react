import { types } from "./types";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  credentialsExpired: false,
  isInitialized: false,
  isFirstTimeLogin: false,
  username: "",
  loginGuid: "",
  permissions: [],
  error: "",
  loading: false,
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
        credentials_expired: action.credentials_expired,
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
