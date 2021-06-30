import { useLocalStorageState } from "ahooks";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { flushTokenInStore } from "../../redux/modules/auth/actions";
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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleClickCancel() {
    history.push("/");
  }

  function handleClickCloseAfter() {
    dispatch(flushTokenInStore());
    history.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (oldPassword && newPassword && newPassword === confirmPassword) {
        setPasswordError("");
        let response = await dispatch(
          updateUserAccount(
            {
              new_password: newPassword,
              guid: loginGuid,
              old_password: oldPassword,
            },
            loginGuid
          )
        );
        console.log(response);

        setIsPasswordChanged(true);
      } else setPasswordError("Passwords don't match. Try again");
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="expired">
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
                  : isFirstTimeLogin && isCredentialsExpired === "true"
                  ? "Please, set up a new password"
                  : "Password expired"}
              </p>
              <p className="tooltip-text">
                Password must be at least 12 characters, including a number, a
                special, and an uppercase letter.
              </p>
              <div className="form-container">
                <div className="form">
                  <div className="input-container">
                    <Form.Group controlId="oldPassword">
                      <Form.Control
                        placeholder="Current password"
                        name="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </Form.Group>
                    <span
                      className={
                        showOldPassword
                          ? "icon-eye-stroke login-page-eye"
                          : "icon-eye login-page-eye"
                      }
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    />
                  </div>

                  <div className="input-container">
                    <Form.Group controlId="newPassword">
                      <Form.Control
                        placeholder="New password"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <span
                      className={
                        showNewPassword
                          ? "icon-eye-stroke login-page-eye"
                          : "icon-eye login-page-eye"
                      }
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>

                  <div className="input-container">
                    <Form.Group controlId="confirmPassword">
                      <Form.Control
                        placeholder="Confirm password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <span
                      className={
                        showConfirmPassword
                          ? "icon-eye-stroke login-page-eye"
                          : "icon-eye login-page-eye"
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>

                  {/* <label>
                    <p>old Password</p>
                    <input
                      type="text"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </label> */}
                  {/* <label>
                    <p>new Password</p>
                    <input
                      type="text"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label> */}
                  {/* <label>
                    <p>confirm Password</p>
                    <input
                      type="text"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label> */}
                  <div>
                    {isCredentialsExpires && (
                      <button onClick={handleClickCancel}>Cancel</button>
                    )}
                    {/* <button type="submit">Submit</button> */}

                    <Button
                      className="button-submit"
                      type="submit"
                      // onClick={this.handleSubmit}
                    >
                      Continue
                    </Button>
                  </div>
                  <div>{passwordError}</div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
