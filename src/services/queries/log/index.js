import logService from "../../log";

export const logsAPI = {
  getMerchantsLogs: async (args) => {
    let { data } = await logService.get("merchants", {
      params: { ...args },
    });
    return data;
  },
  getGroupsLogs: async (args) => {
    let { data } = await logService.get("groups", {
      params: { ...args },
    });
    return data;
  },
  getPartnersLogs: async (args) => {
    let { data } = await logService.get("partners", {
      params: { ...args },
    });
    return data;
  },
  getAdminsLogs: async (args) => {
    let { data } = await logService.get("admins", {
      params: { ...args },
    });
    return data;
  },
  getTransactionsLogs: async (args) => {
    let { data } = await logService.get("transactions", {
      params: { ...args },
    });
    return data;
  },
  getTransactionsStepsLogs: async (args) => {
    let { data } = await logService.get("step_logs", {
      params: { ...args },
    });
    return data;
  },
  getDectaRecotServiceLogs: async (args) => {
    let { data } = await logService.get("services/decta_recot", {
      params: { ...args },
    });
    return data;
  },
  getСhargebackServiceLogs: async (args) => {
    let { data } = await logService.get("services/chargeback", {
      params: { ...args },
    });
    return data;
  },
  getLoginExpiredServiceLogs: async (args) => {
    let { data } = await logService.get("services/login_expired", {
      params: { ...args },
    });
    return data;
  },
  getCurrencyExchangeServiceLogs: async (args) => {
    let { data } = await logService.get("services/currency_exchange", {
      params: { ...args },
    });
    return data;
  },
  getDeleteCardDataServiceLogs: async (args) => {
    let { data } = await logService.get("services/delete_card_data", {
      params: { ...args },
    });
    return data;
  },
  getRecurringServiceLogs: async (args) => {
    let { data } = await logService.get("services/recurring", {
      params: { ...args },
    });
    return data;
  },
};
