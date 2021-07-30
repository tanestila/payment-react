import managementService from "../../../management";

export const blackListRulesAPI = {
  getRules: async (args) => {
    let { data } = await managementService.get("blacklists", {
      params: { ...args },
    });
    return data;
  },
  addRule: async (body) => {
    let { data } = await managementService.post(`blacklists`, body);
    return data;
  },
  deleteRule: async ({ guid, reason }) => {
    let { data } = await managementService.post("blacklists", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
};
