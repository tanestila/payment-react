import managementService from "../../../management";

export const GlobalBlackListAPI = {
  getGlobalBlacklist: async (args) => {
    let { data } = await managementService.get("blacklists/global", {
      params: { ...args },
    });
    return data;
  },
};
