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
  // Create instance

  // Set the AUTH token for any request
  // instance.interceptors.request.use(function (config) {
  //   const token = localStorage.getItem('token');
  //   config.headers.Authorization =  token ? `Bearer ${token}` : '';
  //   return config;
  // });

  return instance;
};

export default authService();
