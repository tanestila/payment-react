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
  addGroup: async (body) => {
    let { data } = await managementService.post(`users/groups`, body);
    return data;
  },
  deleteGroup: async ({ guid, reason }) => {
    let { data } = await managementService.post("users/groups", {
      group_guid: guid,
      delete: true,
      reason,
    });
    return data;
  },
  deleteGroupLogin: async ({ guid, reason, login_guid, role_guid }) => {
    let { data } = await managementService.post(`/groups/${guid}/logins`, {
      login_guid: login_guid,
      role_guid: role_guid,
      delete: true,
      reason,
    });
    return data;
  },
};
