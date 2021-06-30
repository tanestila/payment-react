import managementService from "../../../management";

export const shopsAPI = {
  getShops: async (args) => {
    let { data } = await managementService.get("shops", {
      params: { ...args },
    });
    return data;
  },
  getShop: async (guid) => {
    let { data } = await managementService.get(`shops/${guid}`);
    return data;
  },
  addShop: async (body) => {
    let { data } = await managementService.post("shops", body);
    return data;
  },
  deleteShop: async ({ guid, reason }) => {
    let { data } = await managementService.post("shops", {
      guid,
      delete: true,
      reason,
    });
    return data;
  },
};
