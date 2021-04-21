import managementService from "../../../management";

export const loginAPI = {
  getPrivilegesByLogin: async (guid: string) => {
    return managementService.get(`/logins/${guid}/privileges`);
  },
};
