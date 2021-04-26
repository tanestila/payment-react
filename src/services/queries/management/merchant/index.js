import managementService from "../../../management";

export const merchantAPI = {
  getMerchants: async (args) => {
    let { data } = await managementService.get("users/merchants", {
      params: { ...args },
    });
    return data;
  },
};
