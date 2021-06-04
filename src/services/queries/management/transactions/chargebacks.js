import managementService from "../../../management";

export const chargebacksAPI = {
  getChargebacks: async (args) => {
    let { data } = await managementService.get("chargebacks", {
      params: { ...args },
    });
    return data;
  },
};
