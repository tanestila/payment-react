import axios from "axios";
import {
  successResponseInterceptor,
  tokenRefreshInterceptor,
} from "./interceptor";

const authApiUrl = `http://localhost:8080/api/v1/auth`;

const authService = () => {
  const instance = axios.create({ baseURL: authApiUrl });
  instance.interceptors.response.use(
    successResponseInterceptor,
    tokenRefreshInterceptor
  );

  return instance;
};

export default authService();
