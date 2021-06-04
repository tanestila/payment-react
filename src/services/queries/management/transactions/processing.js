import managementService from "../../../management";

export const transactionsAPI = {
  getTransactions: async (args) => {
    let { data } = await managementService.get("transactions/processing", {
      params: { ...args },
    });
    return data;
  },
};
