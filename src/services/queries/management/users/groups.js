import managementService from "../../../management";

export const groupsAPI = {
  getGroups: async (args) => {
    let { data } = await managementService.get("users/groups", {
      params: { ...args },
    });
    return data;
  },
};
