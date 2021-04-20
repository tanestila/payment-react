import { authAPI } from "../../../services/queries/auth";
import jwt from "jsonwebtoken";
import publicKey from "../../../config/publicKey";
import { loginAPI } from "../../../services/queries/management/login";
import { types } from "./types";
import { Dispatch } from "redux";

const getPermissions = async (token: any) => {
  const { data } = await loginAPI.getPrivilegesByLogin(
    token.userPayload.loginGuid
  );
  return data;
};

const getRole = (isAdmin: boolean, token: any) => {
  let role = "";
  if (isAdmin) {
    role = "admin";
  }
  if (token.userPayload && token.userPayload.partner) {
    role = "partner";
  } else if (token.userPayload && token.userPayload.group) {
    role = "group";
  } else if (token.userPayload && token.userPayload.merchant) {
    role = "merchant";
  }
  return role;
};

interface ICredentials {
  username: string;
  password: string;
}

export const login = (credentials: ICredentials) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: types.SET_LOADING,
    loading: true,
  });
  try {
    // let data = await AuthService.login(credentials);
    let { data } = await authAPI.login(credentials);
    if (!data.status) {
      jwt.verify(data.accessToken, publicKey);
      jwt.verify(data.refreshToken, publicKey);
      dispatch({
        type: types.LOGIN_SUCCESS,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        username: data.username,
        credentials_expired: data.credentials_expired,
        credentials_expire_after: data.credentials_expire_after,
        first_time_login: data.first_time_login,
      });
      const token: any = jwt.decode(data.accessToken);
      const { isAdmin, privileges } = await getPermissions(token);

      dispatch({
        type: types.SET_PRIVILEGES,
        isAdmin,
        permissions: privileges,
        loginGuid: token.userPayload.loginGuid,
        role: getRole(isAdmin, token),
      });
    } else {
      dispatch({
        type: types.OTP_AUTH,
        status: data.status,
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

export const initApp = () => async (dispatch: Dispatch) => {
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
      const token: any = jwt.decode(data.accessToken);
      const { isAdmin, privileges } = await getPermissions(token);
      dispatch({
        type: types.SET_PRIVILEGES,
        isAdmin,
        permissions: privileges,
        loginGuid: token.userPayload.loginGuid,
        role: getRole(isAdmin, token),
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

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: types.SET_LOADING,
    loading: true,
  });
  try {
    await authAPI.logout();
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
