import managementService from "../../../management";

export const templatesAPI = {
  getTemplates: async (args) => {
    let { data } = await managementService.get("transactions", {
      params: { ...args },
    });
    return data;
  },
  getTemplate: async (guid) => {
    let { data } = await managementService.get(`transactions/${guid}`);
    return data;
  },
};
