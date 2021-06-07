import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";

export const Timer = () => {
  const token = useSelector(({ auth }) => {
    return jwt.decode(auth.accessToken);
  });

  const calculateTimeLeft = () => {
    if (token && token.exp) {
      let exp = new Date((token.exp - Math.round(+new Date() / 1000)) * 1000);
      // if ((exp.getMinutes() === 0) & (exp.getSeconds() === 0)) {
      //   // flushTokens();
      // }
      if (exp.getMinutes() < 5 && token.exp) {
        // token = getAuthData();
      }
      // setTokenTtl(exp);
      return exp;
    }
    return 0;
  };

  const [tokenTtl, setTokenTtl] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setTimeout(() => {
      const exp = calculateTimeLeft();
      if ((exp.getMinutes() === 0) & (exp.getSeconds() === 0)) {
        clearInterval(interval);
        // flush
      } else setTokenTtl(exp);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

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
