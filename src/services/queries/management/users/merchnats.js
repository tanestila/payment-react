import managementService from "../../../management";

export const merchantsAPI = {
  getMerchants: async (args) => {
    let { data } = await managementService.get("users/merchants", {
      params: { ...args },
    });
    return data;
  },
  getMerchant: async (guid) => {
    let { data } = await managementService.get(`users/merchants/${guid}`);
    return data;
  },
  getMerchantLogins: async (guid, args) => {
    let { data } = await managementService.get(`merchants/${guid}/logins`, {
      params: { ...args },
    });
    return data;
  },
  addMerchant: async (body) => {
    let { data } = await managementService.post("users/merchants", body);
    return data;
  },
};
