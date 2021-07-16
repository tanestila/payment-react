import managementService from "../../../management";

export const currenciesAPI = {
  getCurrencies: async (args) => {
    let { data } = await managementService.get("currencies", {
      params: { ...args },
    });
    return data;
  },
  addCurrency: async (body) => {
    let { data } = await managementService.post("currencies", body);
    return data;
  },
  getCurrenciesRates: async (args) => {
    let { data } = await managementService.get("currencies/exchange_all", {
      params: { ...args },
    });
    return data;
  },
};
