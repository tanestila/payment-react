import reportService from "../../report";

export const basicReportAPI = {
  getTransactionHistory: async (args) => {
    let { data } = await reportService.get("transaction_history", {
      params: { ...args },
    });
    return data;
  },
  getTransactionTypes: async (guid) => {
    let { data } = await reportService.get("transaction_types");
    return data;
  },
  getCardTypes: async (args) => {
    let { data } = await reportService.get("card_types", {
      params: { ...args },
    });
    return data;
  },
};
