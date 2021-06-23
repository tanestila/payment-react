import managementService from "../../../management";

export const ratesAPI = {
  getRates: async (args) => {
    let { data } = await managementService.get("rates_v1", {
      params: { ...args },
    });
    return data;
  },

  getRatesTemplates: async (args) => {
    let { data } = await managementService.get("rates_v1/templates", {
      params: { ...args },
    });
    return data;
  },
};
