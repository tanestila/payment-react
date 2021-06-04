import managementService from "../../../management";

export const partnersAPI = {
  getPartners: async (args) => {
    let { data } = await managementService.get("users/partners", {
      params: { ...args },
    });
    return data;
  },
};
