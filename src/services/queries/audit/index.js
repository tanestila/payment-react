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
  getShopsHistory: async (args) => {
    let { data } = await auditService.get("shops", {
      params: { ...args },
    });
    return data;
  },
  getAccountsHistory: async (args) => {
    let { data } = await auditService.get("accounts", {
      params: { ...args },
    });
    return data;
  },
  getGatewaysHistory: async (args) => {
    let { data } = await auditService.get("gateways", {
      params: { ...args },
    });
    return data;
  },
  getCurrenciesHistory: async (args) => {
    let { data } = await auditService.get("currencies", {
      params: { ...args },
    });
    return data;
  },
  getTransactionProcessingHistory: async (args) => {
    let { data } = await auditService.get("transaction_processings", {
      params: { ...args },
    });
    return data;
  },
  getTransactionDataHistory: async (args) => {
    let { data } = await auditService.get("transaction_data", {
      params: { ...args },
    });
    return data;
  },
  getTransactionOverviewsHistory: async (args) => {
    let { data } = await auditService.get("transaction_overviews", {
      params: { ...args },
    });
    return data;
  },
  getServicesHistory: async (args) => {
    let { data } = await auditService.get("service_settings", {
      params: { ...args },
    });
    return data;
  },
  getTerminalsHistory: async (args) => {
    let { data } = await auditService.get("terminals", {
      params: { ...args },
    });
    return data;
  },
};
