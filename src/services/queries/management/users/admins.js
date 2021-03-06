import managementService from "../../../management";

export const adminsAPI = {
  getAdmins: async (args) => {
    let { data } = await managementService.get("users/admins", {
      params: { ...args },
    });
    return data;
  },
  getAdmin: async (guid) => {
    let { data } = await managementService.get(`users/admins/${guid}`);
    return data;
  },
  getAdminRoles: async (guid) => {
    let { data } = await managementService.get(`users/admins/${guid}/roles`);
    return data;
  },
  addAdminRole: async ({ guid, body }) => {
    let { data } = await managementService.post(
      `users/admins/${guid}/roles`,
      body
    );
    return data;
  },
  deleteAdminRole: async ({ guid, role_guid, reason }) => {
    let { data } = await managementService.post(`users/admins/${guid}/roles`, {
      guid: role_guid,
      delete: true,
      reason,
    });
    return data;
  },
  addAdmin: async (body) => {
    let { data } = await managementService.post("users/admins", body);
    return data;
  },
  deleteAdmin: async ({ guid, reason }) => {
    let { data } = await managementService.post("users/admins", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
};
