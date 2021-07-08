import managementService from "../../../management";

export const terminalsAPI = {
  getTerminals: async (args) => {
    let { data } = await managementService.get("shops", {
      params: { ...args },
    });
    return data;
  },
  getTerminal: async (guid) => {
    let { data } = await managementService.get(`shops/${guid}`);
    return data;
  },
  addTerminal: async ({ shop_guid, ...body }) => {
    let { data } = await managementService.post(
      `shops/${shop_guid}/terminals`,
      body
    );
    return data;
  },
};
