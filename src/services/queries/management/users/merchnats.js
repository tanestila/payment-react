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
  deleteMerchant: async ({ guid, reason }) => {
    let { data } = await managementService.post("users/merchants", {
      merchant_guid: guid,
      delete: true,
      reason,
    });
    return data;
  },
  addMerchantLogin: async ({ guid, body }) => {
    let { data } = await managementService.post(
      `merchants/${guid}/logins`,
      body
    );
    return data;
  },
  deleteMerchantLogin: async ({ guid, reason, login_guid, role_guid }) => {
    let { data } = await managementService.post(`/merchants/${guid}/logins`, {
      login_guid: login_guid,
      role_guid: role_guid,
      delete: true,
      reason,
    });
    return data;
  },
};
