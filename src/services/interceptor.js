export const tokenRefreshInterceptor = (error) => {
  if (error.response) {
    // if (localStorage.getItem("isLoggedIn") && error.response.status === 401) {
    //   console.log("Catch error in tokenRefreshInterceptor");
    //   console.log(error.response.status);
    //   // flushTokens("Unauthorized");
    // } else if (
    //   localStorage.getItem("isLoggedIn") &&
    //   error.response.status === 403
    // ) {
    //   console.log("Catch error in tokenRefreshInterceptor");
    //   console.log(error.response.status);
    //   // flushTokens(parseResponse(error).message);
    // }
  }
  return Promise.reject(error);
};

export const successResponseInterceptor = async (originResponse) => {
  return originResponse;
};
