import managementService from "../../../management";

export const statementsAPI = {
  getStatements: async (args) => {
    let { data } = await managementService.get("statements", {
      params: { ...args },
    });
    return data;
  },
};
