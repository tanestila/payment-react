import managementService from "../../../management";

export const merchantAPI = {
  getMerchants: async (args) => {
    console.log(args);
    let { data } = await managementService.get("users/merchants", {
      params: { ...args },
    });
    return data;
  },
  addMerchant: async (body) => {
    let { data } = await managementService.post("users/merchants", body);
    return data;
  },
};
