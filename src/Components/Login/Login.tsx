import { MouseEventHandler, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/modules/auth/actions";
import background from "../../assets/img/background.png";
import logo from "../../assets/img/login-logo.svg";
import { Link, Redirect } from "react-router-dom";
import { PasswordInputLogin } from "../Common/Inputs/PasswordInputLogin";
import { LoginInput } from "../Common/Inputs/LoginInput";
import Loading from "../Common/Loading/MainLoading";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const { error, loading, otpAuth, status, isLoggedIn } = useSelector(
    (state: RootStateOrAny) => state.auth
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data;
    if (otpAuth) data = { otp };
    else data = { username, password };
    dispatch(login(data));
  };

  function validateForm() {
    if (!otpAuth) return username.length > 0 && password.length > 0;
    else return username.length > 0 && password.length > 0 && otp.length > 0;
  }
  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <div className="login-page">
      <div className="login-container">
        <div
          className="login-image"
          style={{ backgroundImage: `url(${background})` }}
        >
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="form">
          <form autoComplete="off">
            <p className="header-login">Login</p>
            {!otpAuth ? (
              <>
                <LoginInput onChange={setUsername} value={username} />
                <PasswordInputLogin onChange={setPassword} value={password} />
                <div>
                  <Link className="link" to={"/forgot"} tabIndex={4}>
                    <span>Password Recovery</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="otp-status">{status}</p>
                <PasswordInputLogin
                  onChange={setOtp}
                  value={otp}
                  placeholder="Verification code"
                />
              </>
            )}
            <SubmitButton
              loading={loading}
              onSubmit={handleSubmit}
              validateForm={validateForm}
            />
            {error && <p className="access-denied">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

type SubmitButtonProps = {
  loading: boolean;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  validateForm: Function;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  onSubmit,
  validateForm,
}) => {
  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    // <button className="button-submit " disabled>
    //   loading
    // </button>
    <button
      className="button-submit"
      onClick={onSubmit}
      disabled={!validateForm()}
    >
      LOGIN
    </button>
  );
};
