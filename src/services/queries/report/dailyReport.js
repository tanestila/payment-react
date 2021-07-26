import reportService from "../../report";

export const dailyReportAPI = {
  getTransactionHistory: async (args) => {
    let { data } = await reportService.get("transaction_history", {
      params: { ...args },
    });
    return data;
  },
  getTopMerchants: async (args) => {
    let { data } = await reportService.get("top_merchants", {
      params: { ...args },
    });
    return data;
  },
  getTopPartners: async (args) => {
    let { data } = await reportService.get("top_partners", {
      params: { ...args },
    });
    return data;
  },
  getTopGroups: async (args) => {
    let { data } = await reportService.get("top_groups", {
      params: { ...args },
    });
    return data;
  },
  getTopShops: async (args) => {
    let { data } = await reportService.get("top_shops", {
      params: { ...args },
    });
    return data;
  },
};
