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
};
