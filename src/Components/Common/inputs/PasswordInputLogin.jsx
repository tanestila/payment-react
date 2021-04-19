import { useState } from "react";

export default function PasswordInputLogin({ onChange, value, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <i className={"icon-lock icon"} />
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Enter your password"}
        onChange={handleChange}
        name="password"
        value={value}
        autoComplete="on"
      />
      <span
        className={
          isShowPassword
            ? "icon-eye-stroke login-page-eye"
            : "icon-eye login-page-eye"
        }
        onClick={handleClick}
      />
    </div>
  );
}
