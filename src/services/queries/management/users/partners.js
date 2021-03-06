import managementService from "../../../management";

export const partnersAPI = {
  getPartners: async (args) => {
    let { data } = await managementService.get("users/partners", {
      params: { ...args },
    });
    return data;
  },
  getPartner: async (guid) => {
    let { data } = await managementService.get(`users/partners/${guid}`);
    return data;
  },
  getPartnerLogins: async (guid, args) => {
    let { data } = await managementService.get(`partners/${guid}/logins`, {
      params: { ...args },
    });
    return data;
  },
  getPartnerGroups: async (guid, args) => {
    let { data } = await managementService.get(`partners/${guid}/groups`, {
      params: { ...args },
    });
    return data;
  },
  getPartnerShops: async (guid, args) => {
    let { data } = await managementService.get(`partners/${guid}/shops`, {
      params: { ...args },
    });
    return data;
  },
  addPartnerLogin: async ({ guid, body }) => {
    let { data } = await managementService.post(
      `partners/${guid}/logins`,
      body
    );
    return data;
  },
  addPartner: async (body) => {
    let { data } = await managementService.post("users/partners", body);
    return data;
  },
  deletePartner: async ({ guid, reason }) => {
    let { data } = await managementService.post("users/partners", {
      partner_guid: guid,
      delete: true,
      reason,
    });
    return data;
  },
  deletePartnerLogin: async ({ guid, reason, login_guid, role_guid }) => {
    let { data } = await managementService.post(`/partner/${guid}/logins`, {
      login_guid: login_guid,
      role_guid: role_guid,
      delete: true,
      reason,
    });
    return data;
  },
};
