import React, { useState } from "react";

type PasswordInputLoginProps = {
  onChange: Function;
  value: string;
  placeholder?: string;
};

export const PasswordInputLogin: React.FC<PasswordInputLoginProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
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
};
