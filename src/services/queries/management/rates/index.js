import managementService from "../../../management";

export const ratesAPI = {
  getRates: async (args) => {
    let { data } = await managementService.get("rates_v1", {
      params: { ...args },
    });
    return data;
  },
};
