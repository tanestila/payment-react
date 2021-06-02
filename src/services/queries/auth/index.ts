import authService from "../../auth";

export const authAPI = {
  async login(credentials: any) {
    return authService.post("/login", credentials);
  },

  logout: () => {
    return authService.post("/logout");
  },
};
