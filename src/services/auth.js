import axios from "axios";
import { loginServer } from "./fakeServer";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return loginServer({ username, password });
  }

  logout() {
    return { message: "success" };
  }

  getToken() {
    return { accessToken: "success", refreshToken: "success" };
  }
}

export default new AuthService();
