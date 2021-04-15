import { authAPI } from "../../../services/queries/auth";
import jwt from "jsonwebtoken";
import publicKey from "../../../config/publicKey";
import { loginAPI } from "../../../services/queries/management/login";
import { types } from "./types";

const getPermissions = async (accessToken) => {
  const { data } = await loginAPI.getPrivilegesByLogin(
    getLoginGuid(accessToken)
  );
  return data;
};

const getLoginGuid = (accessToken) => {
  const token = jwt.decode(accessToken, publicKey, {
    algorithm: "RS256",
  });
  return token.userPayload.loginGuid;
};

export const login = (credentials) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING,
    loading: true,
  });
  try {
    // let data = await AuthService.login(credentials);
    let { data } = await authAPI.login(credentials);
    if (!data.status) {
      jwt.verify(data.accessToken, publicKey, { algorithm: "RS256" });
      jwt.verify(data.refreshToken, publicKey, { algorithm: "RS256" });
      dispatch({
        type: types.LOGIN_SUCCESS,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        username: data.username,
        credentials_expired: data.credentials_expired,
        credentials_expire_after: data.credentials_expire_after,
        first_time_login: true,
      });
      const { isAdmin, privileges } = await getPermissions(data.accessToken);
      dispatch({
        type: types.SET_PRIVILEGES,
        isAdmin,
        permissions: privileges,
        loginGuid: getLoginGuid(data.accessToken),
      });
    } else {
      dispatch({
        type: types.OTP_AUTH,
      });
    }

    dispatch({
      type: types.SET_LOADING,
      loading: false,
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
      type: types.LOGIN_FAIL,
      message,
    });
    dispatch({
      type: types.SET_LOADING,
      loading: false,
    });
  }
};

export const initApp = () => async (dispatch) => {
  try {
    let { data } = await authAPI.getToken();
    if (data && data.accessToken) {
      dispatch({
        type: types.INIT_APP,
        isInitialized: true,
        isLoggedIn: true,
        accessToken: data.accessToken,
        refreshToken: data.accessToken,
      });
      const { isAdmin, privileges } = await getPermissions(data.accessToken);
      dispatch({
        type: types.SET_PRIVILEGES,
        isAdmin,
        permissions: privileges,
        loginGuid: getLoginGuid(data.accessToken),
      });
    } else {
      dispatch({
        type: types.INIT_APP,
        isInitialized: true,
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INIT_APP,
      isInitialized: true,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    });
  }
};

export const logout = (credentials) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING,
    loading: true,
  });
  try {
    await authAPI.logout(credentials);
    dispatch({
      type: types.LOGOUT,
    });
    dispatch({
      type: types.SET_LOADING,
      loading: false,
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
      type: types.SET_LOADING,
      loading: false,
    });
  }
};
