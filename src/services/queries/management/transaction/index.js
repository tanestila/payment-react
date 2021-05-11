import managementService from "../../../management";

export const transactionAPI = {
  getTransactions: async (args) => {
    let { data } = await managementService.get("transactions/processing", {
      params: { ...args },
    });
    return data;
  },
};
