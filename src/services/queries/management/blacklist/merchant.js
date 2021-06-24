import managementService from "../../../management";

export const MerchantBlackListAPI = {
  getMerchantBlacklist: async (args) => {
    let { data } = await managementService.get("blacklists/merchants", {
      params: { ...args },
    });
    return data;
  },
};
