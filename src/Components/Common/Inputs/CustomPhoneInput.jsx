import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const CustomPhoneInput = ({ defaultValue, ...props }) => {
  return <PhoneInput value={defaultValue} {...props} />;
};
