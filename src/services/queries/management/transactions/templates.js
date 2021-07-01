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
  getTemplateSteps: async (guid, args) => {
    let { data } = await managementService.get(`transactions/${guid}/steps`, {
      params: { ...args },
    });
    return data;
  },
  getStepParams: async (guid) => {
    let { data } = await managementService.get(`/steps/${guid}/params`);
    return data;
  },
};
