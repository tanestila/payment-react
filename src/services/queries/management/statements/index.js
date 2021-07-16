import managementService from "../../../management";

export const statementsAPI = {
  getStatements: async (args) => {
    let { data } = await managementService.get("statements", {
      params: { ...args },
    });
    return data;
  },
  createStatement: async (body) => {
    let { data } = await managementService.post("statements", body);
    return data;
  },
  getStatement: async (guid) => {
    let { data } = await managementService.get(`/statements/${guid}`);
    return data;
  },
};
