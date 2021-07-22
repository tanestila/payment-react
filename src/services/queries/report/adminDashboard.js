import reportService from "../../report";

export const adminDashboardAPI = {
  getMerchantLimitsData: async (args) => {
    let { data } = await reportService.get("merchants_used_limits", {
      params: { ...args },
    });
    return data;
  },
  getMerchantTotalsData: async (guid) => {
    let { data } = await reportService.get("merchants_used_amounts");
    return data;
  },
  getTurnoverData: async (args) => {
    let { data } = await reportService.get("dashboard_merchant_total", {
      params: { ...args },
    });
    return data;
  },
};
