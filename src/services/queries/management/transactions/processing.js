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
  getTransactionProcessingSteps: async (args) => {
    let { data } = await managementService.get(`steps/processing`, {
      params: { ...args },
    });
    return data;
  },
};
