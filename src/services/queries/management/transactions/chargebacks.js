import managementService from "../../../management";

export const chargebacksAPI = {
  getChargebacks: async (args) => {
    let { data } = await managementService.get("chargebacks", {
      params: { ...args },
    });
    return data;
  },
  getChargeback: async (guid) => {
    let { data } = await managementService.get(`chargebacks/${guid}`);
    return data;
  },
};
