import jwt from "jsonwebtoken";
import { publicKey } from "../config/publicKey";

export const flushToken = (error?: string) => {
  localStorage.clear();
  localStorage.setItem("error", error || "");
  window.location.reload();
};

export const tokenRefreshInterceptor = (error) => {
  console.log(error.response);
  if (error.response) {
    if (error.response.status === 401) {
      console.log("Catch error in tokenRefreshInterceptor");
      console.log(error.response.status);
      flushToken("Unauthorized");
    }
  }
  return Promise.reject(error);
};

export const successResponseInterceptor = async (originResponse) => {
  if (localStorage.getItem("isLoggedIn")) {
    //   const token = getAuthData();
    //   const exp = new Date((token.exp - Math.round(+new Date() / 1000)) * 1000);
    //   if (exp.getMinutes() < 5)
    //     //delete async await from Promise
    //     return new Promise(resolve => {
    //       if (!isAlreadyFetchingAccessToken) {
    //         isAlreadyFetchingAccessToken = true;
    //         try {
    //           const response = issueToken();
    //           isAlreadyFetchingAccessToken = false;
    //           setTokens(response.data.accessToken, response.data.refreshToken);
    //           return resolve(originResponse);
    //         } catch (err) {
    //           console.log("Catch error in successResponseInterceptor");
    //           console.log(err);
    //           flushTokens("Token expired");
    //         }
    //       } else return resolve(originResponse);
    //     });
  }
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
