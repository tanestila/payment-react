import reportService from "../../report";

export const histogramReportAPI = {
  get: async (args) => {
    let { data } = await reportService.get("transaction_histogram", {
      params: { ...args },
    });
    return data;
  },
};
