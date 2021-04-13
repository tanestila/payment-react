export function loginServer({ login, password }) {
  setTimeout(() => {}, 1000);
  if (login === "admin" && password === "admin")
    return { accessToken: "2", refreshToken: "1" };
}
