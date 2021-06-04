import managementService from "../../../management";

export const blackListRulesAPI = {
  getRules: async (args) => {
    let { data } = await managementService.get("blacklists", {
      params: { ...args },
    });
    return data;
  },
};
