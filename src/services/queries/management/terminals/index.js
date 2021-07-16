import managementService from "../../../management";

export const terminalsAPI = {
  getTerminals: async (args) => {
    const { data } = await managementService.get("terminals", {
      params: { ...args },
    });
    return data;
  },
  getTerminal: async (shop_guid, terminal_guid) => {
    const { data } = await managementService.get(
      `shops/${shop_guid}/terminals/${terminal_guid}`
    );
    return data;
  },
  addTerminal: async ({ shop_guid, ...body }) => {
    const { data } = await managementService.post(
      `shops/${shop_guid}/terminals`,
      body
    );
    return data;
  },
  deleteTerminal: async ({ shop_guid, reason, guid }) => {
    const { data } = await managementService.post(
      `shops/${shop_guid}/terminals`,
      {
        guid,
        delete: true,
        reason,
      }
    );
    return data;
  },
  getTerminalProps: async ({ terminal_guid, gateway_guid }) => {
    const { data } = await managementService.get(
      `/terminals/${terminal_guid}/gateway/${gateway_guid}/props`
    );
    return data;
  },
  editTerminalProps: async ({ terminal_guid, gateway_guid, ...body }) => {
    const { data } = await managementService.post(
      `/terminals/${terminal_guid}/gateway/${gateway_guid}/props`,
      body
    );
    return data;
  },
  getGatewayTerminals: async (gateway_guid) => {
    const { data } = await managementService.get(
      `gateway/${gateway_guid}/terminals`
    );
    return data;
  },
  generateTerminalCredentials: async (guid) => {
    const { data } = await managementService.get(
      `terminals/${guid}/generate_credentials`
    );
    return data;
  },
};
