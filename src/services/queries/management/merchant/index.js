import managementService from "../../../management";
import { useQuery } from "react-query";

export const merchantAPI = {
  getMerchants: async (args) => {
    let { data } = await managementService.get("users/merchants", {
      params: { ...args },
    });
    return data;
  },
};

export function useMerchants() {
  return useQuery("merchants", async () => {
    const { data } = await managementService.get("users/merchants");
    return data;
  });
}
