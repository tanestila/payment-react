import { authAPI } from "../../../services/queries/auth";
import jwt from "jsonwebtoken";
import { publicKey } from "../../../config/publicKey";
import { loginsAPI } from "../../../services/queries/management/logins";
import { types } from "./types";
import { Dispatch } from "redux";
import { getTokens } from "../../../helpers/getTokens";

interface ICredentials {
  username: string;
  password: string;
}

interface ICredentialsOTP {
  otp: string;
}

const getPermissions = async (token: any) => {
  const { data } = await loginsAPI.getPrivilegesByLogin(
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

const setInLocalStorage = (
  credentials_expired: any,
  first_time_login: any,
  credentials_expire_after: any,
  loginGuid: string,
  username: string
) => {
  if (credentials_expired) localStorage.setItem("isCredentialsExpired", "true");
  else localStorage.setItem("isCredentialsExpired", "false");

  if (first_time_login) localStorage.setItem("isFirstTimeLogin", "true");
  else localStorage.setItem("isFirstTimeLogin", "false");

  if (credentials_expire_after)
    localStorage.setItem("credentialsExpireAfter", credentials_expire_after);
  else localStorage.setItem("credentialsExpireAfter", "false");

  if (username) {
    localStorage.setItem("username", username);
  }

  if (loginGuid) {
    localStorage.setItem("loginGuid", loginGuid);
  }
};

export const initApp = () => async (dispatch: Dispatch) => {
  try {
    let auth = getTokens();
    if (auth?.accessToken) {
      dispatch({
        type: types.SET_TOKENS,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      });
      const token: any = jwt.decode(auth.accessToken);
      dispatch({
        type: types.SET_PRIVILEGES,
        permissions: localStorage.getItem("permissions")
          ? JSON.parse(localStorage.getItem("permissions")!)
          : [],
        loginGuid: token.userPayload.loginGuid,
        role: getRole(localStorage.getItem("isAdmin") === "true", token),
      });
      // const { isAdmin, privileges } = await getPermissions(token);

      dispatch({
        type: types.INIT_APP,
        isInitialized: true,
        isLoggedIn: true,
        username: localStorage.getItem("username"),
        credentials_expired:
          localStorage.getItem("isCredentialsExpired") === "true",
        credentials_expire_after:
          localStorage.getItem("credentialsExpireAfter") === "true",
        first_time_login: localStorage.getItem("isFirstTimeLogin") === "true",
        loginGuid: localStorage.getItem("loginGuid"),
      });
    } else {
      dispatch({
        type: types.INIT_APP,
        isInitialized: true,
        isLoggedIn: false,
      });
      dispatch({
        type: types.SET_TOKENS,
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

export const login =
  (credentials: ICredentials | ICredentialsOTP) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: types.SET_LOADING,
      loading: true,
    });
    try {
      let { data } = await authAPI.login(credentials);
      if (!data.status) {
        jwt.verify(data.accessToken, publicKey);
        jwt.verify(data.refreshToken, publicKey);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        const token: any = jwt.decode(data.accessToken);

        dispatch({
          type: types.SET_TOKENS,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        dispatch({
          type: types.INIT_APP,
          isInitialized: true,
          isLoggedIn: true,
          username: data.username,
          credentials_expired: data.credentials_expired,
          credentials_expire_after: data.credentials_expire_after,
          first_time_login: data.first_time_login,
          loginGuid: token.userPayload.loginGuid,
        });

        setInLocalStorage(
          data.credentials_expired,
          data.first_time_login,
          data.credentials_expire_after,
          token.userPayload.loginGuid,
          data.username
        );
        const { isAdmin, privileges } = await getPermissions(token);
        localStorage.setItem("permissions", JSON.stringify(privileges));
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("role", getRole(isAdmin, token));
        dispatch({
          type: types.SET_PRIVILEGES,
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
    localStorage.clear();
    dispatch({
      type: types.SET_LOADING,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.SET_LOADING,
      loading: false,
    });
  }
};
