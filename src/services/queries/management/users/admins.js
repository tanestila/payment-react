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
};
