import managementService from "../../../management";

export const gatewayAPI = {
  getGateways: async (args) => {
    console.log(args);
    let { data } = await managementService.get("gateways", {
      params: { ...args },
    });
    return data;
  },
};
