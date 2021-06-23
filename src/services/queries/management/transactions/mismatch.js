import managementService from "../../../management";

export const mismatchAPI = {
  getMismatchTransactions: async (args) => {
    let { data } = await managementService.get("transactions/mismatch", {
      params: { ...args },
    });
    return data;
  },
  getMismatchTransaction: async (guid) => {
    let { data } = await managementService.get(`transactions/mismatch/${guid}`);
    return data;
  },
};
