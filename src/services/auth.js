import axios from "axios";

const authApiUrl = `http://localhost:8080/api/v1/auth`;
class AuthService {
  constructor() {
    this.instance = axios.create({ baseURL: authApiUrl });
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
