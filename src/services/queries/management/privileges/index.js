import managementService from "../../../management";

export const privilegesAPI = {
  getPrivileges: async (args) => {
    let { data } = await managementService.get("privileges", {
      params: { ...args },
    });
    return data;
  },
};
