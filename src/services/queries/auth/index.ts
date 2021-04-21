import authService from "../../auth";

export const authAPI = {
  async login(credentials: any) {
    return authService.post("/login", credentials, {
      withCredentials: true,
    });
  },
  getToken() {
    return authService.get("/get_token", { withCredentials: true });
  },
  logout: () => {
    return authService.post("/logout", { withCredentials: true });
  },
};
