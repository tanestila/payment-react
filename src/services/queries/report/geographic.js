import reportService from "../../report";

export const geographicAPI = {
  get: async (args) => {
    let { data } = await reportService.get("transaction_geo", {
      params: { ...args },
    });
    return data;
  },
};
