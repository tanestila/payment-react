import { useThrottleFn } from "ahooks";
import { useState } from "react";
import { usersAPI } from "../services/queries/management/users/users";

export const useCheckEmailExist = () => {
  const [prevEmail, setPrevEmail] = useState("");
  const [prevResponse, setPrevResponse] = useState("");

  const { run } = useThrottleFn(
    async (value) => {
      if (prevEmail === value) return prevResponse;
      else
        try {
          const { data: checkResponse } = await usersAPI.checkExists({
            email: value,
          });
          if (checkResponse) {
            setPrevEmail(value);
            setPrevResponse(!checkResponse.email_exists);
            return !checkResponse.email_exists;
          } else return false;
        } catch (error) {
          return false;
        }
    },
    {
      wait: 800,
    }
  );
  return { run };
};
