import reportService from "../../report";

export const ordersAPI = {
  getOrders: async (args) => {
    let { data } = await reportService.get("orders", {
      params: { ...args },
    });
    return data;
  },
  getOrder: async (guid) => {
    let { data } = await reportService.get(`orders/${guid}`);
    return data;
  },
};
