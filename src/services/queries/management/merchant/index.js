import managementService from "../../../management";
import { useQuery } from "react-query";

export const merchantAPI = {
  getMerchants: async (args) => {
    return managementService.get("users/merchants", { params: { ...args } });
  },
};

export function useMerchants() {
  return useQuery("merchants", async () => {
    const { data } = await managementService.get("users/merchants");
    return data;
  });
}
