import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/auth/actions";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const otpAuth = useSelector((state) => state.auth.otpAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (otp) data = { otp };
    else data = { username, password };
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      {!otpAuth ? (
        <>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </label>
        </>
      ) : (
        <>
          <label>
            <p>OTP</p>
            <input type="text" onChange={(e) => setOtp(e.target.value)} />
          </label>
        </>
      )}
      <div>
        <button type="submit">Submit</button>
      </div>

      {error && <div>{error}</div>}
      {loading && <div>loading</div>}
    </form>
  );
}
