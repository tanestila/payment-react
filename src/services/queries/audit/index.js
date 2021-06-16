import auditService from "../../audit";

export const auditAPI = {
  getMerchantsHistory: async (args) => {
    let { data } = await auditService.get("merchants", {
      params: { ...args },
    });
    return data;
  },
  getGroupsHistory: async (args) => {
    let { data } = await auditService.get("groups", {
      params: { ...args },
    });
    return data;
  },
  getPartnersHistory: async (args) => {
    let { data } = await auditService.get("partners", {
      params: { ...args },
    });
    return data;
  },
  getLoginsHistory: async (args) => {
    let { data } = await auditService.get("logins", {
      params: { ...args },
    });
    return data;
  },
};
