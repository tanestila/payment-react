import managementService from "../../../management";

export const merchantAPI = {
  getMerchants: async (args) => {
    return managementService.get("users/merchants", { params: { ...args } });
  },
};
