import managementService from "../../../management";

export const shopsAPI = {
  getShops: async (args) => {
    let { data } = await managementService.get("shops", {
      params: { ...args },
    });
    return data;
  },
};
