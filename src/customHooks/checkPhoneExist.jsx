import { useThrottleFn } from "ahooks";
import { useState } from "react";
import { usersAPI } from "../services/queries/management/users/users";

export const useCheckPhoneExist = () => {
  const [prevPhone, setPrevPhone] = useState("");
  const [prevResponse, setPrevResponse] = useState("");

  const { run } = useThrottleFn(
    async (value) => {
      if (prevPhone === value) return prevResponse;
      else
        try {
          const { data: checkResponse } = await usersAPI.checkExists({
            phone: value,
          });
          if (checkResponse) {
            setPrevPhone(value);
            setPrevResponse(!checkResponse.phone_exists);
            return !checkResponse.phone_exists;
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
