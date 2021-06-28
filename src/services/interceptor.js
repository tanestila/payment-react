import axios from "axios";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { publicKey } from "../config/publicKey";
import { getTokens } from "../helpers/getTokens";
import {
  flushTokenInStore,
  updateTokenInStore,
} from "../redux/modules/auth/actions";
import store from "../redux/store";

export const tokenRefreshInterceptor = (error) => {
  console.log(error.response);
  if (error.response) {
    if (error.response.status === 401) {
      console.log("Catch error in tokenRefreshInterceptor");
      console.log(error.response.status);
      store.dispatch(flushTokenInStore("Unauthorized"));
    }
  }
  return Promise.reject(error);
};

const issueToken = () => {
  const refreshToken = getTokens().refreshToken;
  return axios.post(`${config.node.host}/api/v1/auth/token`, {
    refreshToken,
  });
};

let isAlreadyFetchingAccessToken = false;
export const updateTokens = async () => {
  if (localStorage.getItem("auth")) {
    const token = jwt.decode(getTokens().accessToken, publicKey, {
      algorithm: "RS256",
    });
    const exp = new Date((token.exp - Math.round(+new Date() / 1000)) * 1000);
    if (exp.getMinutes() < 5)
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        try {
          const { data } = await issueToken();
          console.log(data);
          store.dispatch(
            updateTokenInStore(data.accessToken, data.refreshToken)
          );
          isAlreadyFetchingAccessToken = false;
        } catch (err) {
          console.log("Catch error in successResponseInterceptor");
          console.log(err);
          store.dispatch(flushTokenInStore("Token update error"));
        }
      }
  }
};

export const successResponseInterceptor = async (originResponse) => {
  await updateTokens();
  return originResponse;
};

// export const getAuthData = () => {
//   try {
//     if (!localStorage.getItem("isLoggedIn")) return;
//     const { accessToken } = JSON.parse(localStorage.getItem("auth"));
//     return jwt.decode(accessToken, publicKey, { algorithm: "RS256" });
//   } catch (error) {
//     console.log("Catch error in get auth data ");
//     console.log(error);

//     flushToken("Something went wrong");
//   }
// };

// let isAlreadyFetchingAccessToken = false;
// export const updateTokens = async () => {
//   if (localStorage.getItem("isLoggedIn")) {
//     const token = getAuthData();
//     const exp = new Date((token.exp - Math.round(+new Date() / 1000)) * 1000);
//     if (exp.getMinutes() < 5)
//       if (!isAlreadyFetchingAccessToken) {
//         isAlreadyFetchingAccessToken = true;
//         try {
//           const response = await issueToken();
//           isAlreadyFetchingAccessToken = false;
//           setTokens(response.data.accessToken, response.data.refreshToken);
//         } catch (err) {
//           console.log("Catch error in update tokens");
//           console.log(err);
//           flushTokens("Token expired");
//         }
//       }
//   }
// };
