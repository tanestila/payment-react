import managementService from "../../../management";

export const gatewaysAPI = {
  getGateways: async (args) => {
    let { data } = await managementService.get("gateways", {
      params: { ...args },
    });
    return data;
  },
};
