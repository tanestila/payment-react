import managementService from "../../../management";

export const gatewayAPI = {
  getGateways: async (args) => {
    let { data } = await managementService.get("gateways", {
      params: { ...args },
    });
    return data;
  },
};
