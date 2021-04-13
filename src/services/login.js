import axios from "axios";

// const managementApiUrl = `${config.node.host}/api/v1/management`;
class AuthService {
  constructor() {
    // this.instance = axios.create({ baseURL: authApiUrl });
  }

  async login(credentials) {
    const response = await this.instance.post("/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  }

  logout() {
    return { message: "success" };
  }

  getToken() {
    return this.instance.get("/get_token", { withCredentials: true });
  }
}

export default new AuthService();
