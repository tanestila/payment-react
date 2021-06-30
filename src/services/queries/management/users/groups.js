import managementService from "../../../management";

export const groupsAPI = {
  getGroups: async (args) => {
    let { data } = await managementService.get("users/groups", {
      params: { ...args },
    });
    return data;
  },
  getGroup: async (guid) => {
    let { data } = await managementService.get(`users/groups/${guid}`);
    return data;
  },
  getGroupLogins: async (guid, args) => {
    let { data } = await managementService.get(`groups/${guid}/logins`, {
      params: { ...args },
    });
    return data;
  },
  getGroupMerchants: async (guid, args) => {
    let { data } = await managementService.get(`groups/${guid}/merchants`, {
      params: { ...args },
    });
    return data;
  },
  getGroupShops: async (guid, args) => {
    let { data } = await managementService.get(`groups/${guid}/shops`, {
      params: { ...args },
    });
    return data;
  },
  addGroupLogin: async ({ guid, body }) => {
    let { data } = await managementService.post(`groups/${guid}/logins`, body);
    return data;
  },
};
