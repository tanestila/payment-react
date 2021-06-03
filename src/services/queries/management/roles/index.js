import managementService from "../../../management";

export const rolesAPI = {
  getRoles: async (args) => {
    let { data } = await managementService.get("roles", {
      params: { ...args },
    });
    return data;
  },
};
