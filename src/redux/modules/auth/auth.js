import AuthService from "../../../services/auth";

const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "app/auth/LOGIN_FAIL";
const INIT_APP = "app/auth/INIT_APP";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  refreshToken: "",
  username: "",
  credentials_expired: false,
  isInitialized: false,
  isFirstTimeLogin: false,
  permissions: [],
  error: "",
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        isInitialized: action.isInitialized,
        isLoggedIn: action.isLoggedIn,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        error: action.error,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        username: action.username,
        credentials_expired: action.credentials_expired,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.message,
        isLoggedIn: false,
      };

    default:
      return { ...state };
  }
}

export const LoginSuccessAC = () => ({
  type: LOGIN_SUCCESS,
});

export const LoginFailAC = () => ({
  type: LOGIN_FAIL,
});

export const login = (credentials) => async (dispatch) => {
  try {
    let data = await AuthService.login(credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      username: data.username,
      credentials_expired: data.credentials_expired,
    });
  } catch (error) {
    console.log(error);
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.description &&
        error.response.data.description.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: LOGIN_FAIL,
      message,
    });
  }
};

export const initApp = () => async (dispatch) => {
  try {
    let { data } = await AuthService.getToken();
    debugger;
    if (data && data.accessToken) {
      dispatch({
        type: INIT_APP,
        isInitialized: true,
        isLoggedIn: true,
        accessToken: data.accessToken,
        refreshToken: data.accessToken,
      });
    } else {
      dispatch({
        type: INIT_APP,
        isInitialized: true,
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: INIT_APP,
      isInitialized: true,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    });
  }
};
