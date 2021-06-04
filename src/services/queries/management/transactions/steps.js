import managementService from "../../../management";

export const terminalsAPI = {
  getTerminals: async (args) => {
    let { data } = await managementService.get("terminals", {
      params: { ...args },
    });
    return data;
  },
};
