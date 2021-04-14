import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAccount } from "../../redux/modules/userprofile/actions";

export default function ExpiredPassword() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userprofile.profile);
  const loginGuid = useSelector((state) => state.auth.loginGuid);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // dispatch(getUserAccount());
  }, []);

  const handleSubmit = async (e) => {
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
    } else setPasswordError("Passwords don't match. Try again");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="header-login">Please, set up a new password</p>
      <p className="tooltip-text">
        Password must be at least 8 characters, including a number, a special,
        and an uppercase letter.
      </p>
      <label>
        <p>Password</p>
        <input type="text" onChange={(e) => setOldPassword(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="text" onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input
          type="text"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      <div>{passwordError}</div>
    </form>
  );
}
