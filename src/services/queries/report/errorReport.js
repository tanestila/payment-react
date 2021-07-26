import reportService from "../../report";

export const errorReportAPI = {
  get: async (args) => {
    let { data } = await reportService.get("transaction_errors", {
      params: { ...args },
    });
    return data;
  },
};
