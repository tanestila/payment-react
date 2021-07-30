import managementService from "../../../management";

export const GlobalBlackListAPI = {
  getGlobalBlacklist: async (args) => {
    let { data } = await managementService.get("blacklists/global", {
      params: { ...args },
    });
    return data;
  },
  addGlobalBlacklist: async (body) => {
    let { data } = await managementService.post(`blacklists/global`, body);
    return data;
  },
  deleteGlobalBlacklist: async ({ blacklist_rule_guid, reason }) => {
    let { data } = await managementService.post("blacklists/global", {
      blacklist_rule_guid,
      delete: true,
      reason,
    });
    return data;
  },
};
