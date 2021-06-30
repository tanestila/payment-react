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
  addAdmin: async (body) => {
    let { data } = await managementService.post("users/admins", body);
    return data;
  },
};
