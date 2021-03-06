import managementService from "../../../management";

export const accountsAPI = {
  getAccounts: async (guid, args) => {
    let { data } = await managementService.get(`merchants/${guid}/accounts`, {
      params: { ...args },
    });
    return data;
  },
  addAccount: async ({ guid, body }) => {
    let { data } = await managementService.post(
      `merchants/${guid}/accounts`,
      body
    );
    return data;
  },
};
