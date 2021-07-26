import reportService from "../../report";

export const basicReportAPI = {
  getTransactionTypes: async (args) => {
    let { data } = await reportService.get("transaction_types", {
      params: { ...args },
    });
    return data;
  },
  getCardTypes: async (args) => {
    let { data } = await reportService.get("card_types", {
      params: { ...args },
    });
    return data;
  },
  getCurrencies: async (args) => {
    let { data } = await reportService.get("currencies", {
      params: { ...args },
    });
    return data;
  },
  getTotals: async (args) => {
    let { data } = await reportService.get("totals", {
      params: { ...args },
    });
    return data;
  },
  getShopTotals: async (args) => {
    let { data } = await reportService.get("shop_totals", {
      params: { ...args },
    });
    return data;
  },
};
