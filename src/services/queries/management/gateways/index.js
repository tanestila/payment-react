import managementService from "../../../management";

export const gatewaysAPI = {
  getGateways: async (args) => {
    let { data } = await managementService.get("gateways", {
      params: { ...args },
    });
    return data;
  },
  getGateway: async (guid) => {
    let { data } = await managementService.get(`gateways/${guid}`);
    return data;
  },
  getGatewayProperties: async (guid) => {
    let { data } = await managementService.get(`gateways/${guid}/props`);
    return data;
  },
  addGateway: async (body) => {
    let { data } = await managementService.post("gateways", body);
    return data;
  },
  deleteGateway: async ({ guid, reason }) => {
    let { data } = await managementService.post("gateways", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
};
