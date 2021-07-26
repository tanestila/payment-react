import reportService from "../../report";

export const TandCReportAPI = {
  get: async (args) => {
    let { data } = await reportService.get("transaction_and_commission", {
      params: { ...args },
    });
    return data;
  },
};
