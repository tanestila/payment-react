import managementService from "../../../management";

export const terminalsAPI = {
  // getTerminals: async (args) => {
  //   let { data } = await managementService.get("shops", {
  //     params: { ...args },
  //   });
  //   return data;
  // },
  getTerminal: async (shop_guid, terminal_guid) => {
    let { data } = await managementService.get(
      `shops/${shop_guid}/terminals/${terminal_guid}`
    );
    return data;
  },
  addTerminal: async ({ shop_guid, ...body }) => {
    let { data } = await managementService.post(
      `shops/${shop_guid}/terminals`,
      body
    );
    return data;
  },
  deleteTerminal: async ({ shop_guid, reason, guid }) => {
    let { data } = await managementService.post(
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
    let { data } = await managementService.get(
      `/terminals/${terminal_guid}/gateway/${gateway_guid}/props`
    );
    return data;
  },
  editTerminalProps: async ({ terminal_guid, gateway_guid, ...body }) => {
    let { data } = await managementService.post(
      `/terminals/${terminal_guid}/gateway/${gateway_guid}/props`,
      body
    );
    return data;
  },
};
