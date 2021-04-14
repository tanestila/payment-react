import managementService from "../../../management";

export const loginAPI = {
  getPrivilegesByLogin: async (guid) => {
    return managementService.get(`/logins/${guid}/privileges`);
  },
};
