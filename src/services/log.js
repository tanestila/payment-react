import axios from "axios";
import store from "../redux/store";
import {
  successResponseInterceptor,
  tokenRefreshInterceptor,
} from "./interceptor";
import { config } from "../config";
const logApiUrl = `${config.node.host}/api/v1/logs`;

const instance = axios.create({ baseURL: logApiUrl });
instance.defaults.headers.common["Authorization"] = store.getState().auth
  .accessToken
  ? `Bearer ${store.getState().auth.accessToken}`
  : undefined;
instance.interceptors.response.use(
  successResponseInterceptor,
  tokenRefreshInterceptor
);

let currentAuth;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().auth.accessToken;
  if (prevAuth !== currentAuth) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${currentAuth}`;
  }
});

export default instance;
