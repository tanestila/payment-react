import managementService from "../../../management";

export const merchantsAPI = {
  getMerchants: async (args) => {
    let { data } = await managementService.get("users/merchants", {
      params: { ...args },
    });
    return data;
  },
  addMerchant: async (body) => {
    let { data } = await managementService.post("users/merchants", body);
    return data;
  },
};
