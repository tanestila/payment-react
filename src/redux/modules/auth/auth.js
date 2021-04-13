import AuthService from "../../service/auth";

const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "app/auth/LOGIN_FAIL";
const INIT_APP = "app/auth/INIT_APP";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  refreshToken: "",
  isInitialized: false,
  isFirstTimeLogin: false,
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
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };

    case LOGIN_FAIL:
      return {
        ...state,
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

export const login = (username, password) => async (dispatch) => {
  try {
    let data = await AuthService.login(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const initApp = () => async (dispatch) => {
  try {
    let data = await AuthService.getToken();
    if (data) {
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
