import managementService from "../../../management";

export const servicesAPI = {
  getServices: async (args) => {
    let { data } = await managementService.get("services", {
      params: { ...args },
    });
    return data;
  },
};
