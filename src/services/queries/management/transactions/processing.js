import managementService from "../../../management";

export const transactionsAPI = {
  getTransactions: async (args) => {
    let { data } = await managementService.get("transactions/processing", {
      params: { ...args },
    });
    return data;
  },
  getTransaction: async (guid) => {
    let { data } = await managementService.get(
      `transactions/processing/${guid}`
    );
    return data;
  },
  updateTransaction: async (body) => {
    let { data } = await managementService.post(
      `transactions/processing/`,
      body
    );
    return data;
  },
  getTransactionProcessingSteps: async (args) => {
    let { data } = await managementService.get(`steps/processing`, {
      params: { ...args },
    });
    return data;
  },
  getTransactionRates: async (guid) => {
    let { data } = await managementService.get(
      `transactions/processing/${guid}/rates`
    );
    return data;
  },
};
