import managementService from "../../../management";

export const ratesAPI = {
  getRates: async (args) => {
    let { data } = await managementService.get("rates_v1", {
      params: { ...args },
    });
    return data;
  },
  getRate: async (guid) => {
    let { data } = await managementService.get(`rates_v1/${guid}`);
    return data;
  },
  addRate: async (body) => {
    let { data } = await managementService.post("rates_v1", body);
    return data;
  },
  deleteRate: async ({ guid, reason }) => {
    let { data } = await managementService.post("rates_v1", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
  getRatesTemplates: async (args) => {
    let { data } = await managementService.get("rates_v1/templates", {
      params: { ...args },
    });
    return data;
  },
  addRateTemplate: async (body) => {
    let { data } = await managementService.post("rates_v1/templates", body);
    return data;
  },
  deleteRateTemplate: async ({ guid, reason }) => {
    let { data } = await managementService.post("rates_v1/templates", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
  getRateRevisions: async (guid, { args }) => {
    let { data } = await managementService.get(`rates_v1/${guid}/revisions`, {
      params: { ...args },
    });
    return data;
  },
  addRevision: async (guid, body) => {
    let { data } = await managementService.post(
      `rates_v1/${guid}/revisions`,
      body
    );
    return data;
  },
  deleteRevision: async (rate_guid, { guid, reason }) => {
    let { data } = await managementService.post(
      `rates_v1/${rate_guid}/revisions`,
      { guid, reason, delete: true }
    );
    return data;
  },
};
