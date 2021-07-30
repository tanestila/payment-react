import managementService from "../../../management";

export const MerchantBlackListAPI = {
  getMerchantBlacklist: async (args) => {
    let { data } = await managementService.get("blacklists/merchants", {
      params: { ...args },
    });
    return data;
  },
  addMerchantBlacklist: async (body) => {
    let { data } = await managementService.post(`blacklists/merchants`, body);
    return data;
  },
  deleteMerchantBlacklist: async ({
    blacklist_rule_guid,
    merchant_guid,
    reason,
  }) => {
    let { data } = await managementService.post("blacklists/merchants", {
      blacklist_rule_guid,
      merchant_guid,
      delete: true,
      reason,
    });
    return data;
  },
};
