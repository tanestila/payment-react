import managementService from "../../../management";

export const loginsAPI = {
  getPrivilegesByLogin: async (guid: string) => {
    return managementService.get(`/logins/${guid}/privileges`);
  },
};
