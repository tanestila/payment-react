import { useLocalStorageState } from "ahooks";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateUserAccount } from "../../redux/modules/userprofile/actions";

export const ExpiredPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    loginGuid,
    isFirstTimeLogin,
    isCredentialsExpired,
    isCredentialsExpires,
  } = useSelector((state: RootStateOrAny) => state.auth);

  const [_, setCredentialsExpireAfter] = useLocalStorageState(
    "isCredentialsExpired",
    "false"
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  function handleClickCancel() {
    history.push("/");
  }

  function handleClickCloseAfter() {
    setCredentialsExpireAfter("false");
    history.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPassword && newPassword && newPassword === confirmPassword) {
      setPasswordError("");
      dispatch(
        updateUserAccount(
          {
            new_password: newPassword,
            guid: loginGuid,
            old_password: oldPassword,
          },
          loginGuid
        )
      );
      setIsPasswordChanged(true);
    } else setPasswordError("Passwords don't match. Try again");
  };

  return (
    <>
      {isPasswordChanged ? (
        <>
          <p>New password set successfully</p>
          <button onClick={handleClickCloseAfter}>Cancel</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="header-login">
            {isCredentialsExpires
              ? "Your password will expire soon"
              : isFirstTimeLogin && isCredentialsExpired
              ? "Please, set up a new password"
              : "Password expired"}
          </p>
          <p className="tooltip-text">
            Password must be at least 12 characters, including a number, a
            special, and an uppercase letter.
          </p>
          <label>
            <p>old Password</p>
            <input
              type="text"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>
          <label>
            <p>new Password</p>
            <input
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label>
            <p>confirm Password</p>
            <input
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div>
            {isCredentialsExpires && (
              <button onClick={handleClickCancel}>Cancel</button>
            )}
            <button type="submit">Submit</button>
          </div>
          <div>{passwordError}</div>
        </form>
      )}
    </>
  );
};
