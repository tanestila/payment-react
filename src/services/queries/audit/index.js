import auditService from "../../audit";

export const auditAPI = {
  getMerchantsHistory: async (args) => {
    let { data } = await auditService.get("merchants", {
      params: { ...args },
    });
    return data;
  },
};
