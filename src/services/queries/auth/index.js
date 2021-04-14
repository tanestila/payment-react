import authService from "../../auth";

export const authAPI = {
  async login(credentials) {
    return authService.post("/login", credentials, {
      withCredentials: true,
    });
  },
  getToken() {
    return authService.get("/get_token", { withCredentials: true });
  },
  logout: () => {},
};
