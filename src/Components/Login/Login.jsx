import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/auth/auth";

// async function loginUser(credentials) {
//   // if (credentials) return { accessToken: "sds" };

// }

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password, type: "login-password" }));
    // const token = await loginUser({ username, password });
    // login(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}
