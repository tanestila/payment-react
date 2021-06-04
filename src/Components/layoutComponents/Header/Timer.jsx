import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Timer = () => {
  const [tokenTtl, setTokenTtl] = useState(new Date());
  const token = useSelector(({ auth }) => auth.accessToken);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(token);
      if (token && token.exp) {
        let exp = new Date((token.exp - Math.round(+new Date() / 1000)) * 1000);
        if ((exp.getMinutes() === 0) & (exp.getSeconds() === 0)) {
          // flushTokens();
        }
        if (exp.getMinutes() < 5 && token.exp) {
          // token = getAuthData();
        }
        setTokenTtl(exp);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return tokenTtl ? (
    <span
      style={
        tokenTtl.getMinutes() < 1
          ? {
              color: "red",
              fontWeight: "bold",
            }
          : {}
      }
    >
      {tokenTtl.getMinutes()}:
      {(tokenTtl.getSeconds() < 10 ? "0" : "") + tokenTtl.getSeconds()}
    </span>
  ) : null;
};
