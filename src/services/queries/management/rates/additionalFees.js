import managementService from "../../../management";

export const additionalFeesAPI = {
  getAdditionalFees: async (args) => {
    let { data } = await managementService.get(
      "statements/additionalFeesNames",
      {
        params: { ...args },
      }
    );
    return data;
  },
  addAdditionalFee: async (body) => {
    let { data } = await managementService.post(
      "statements/additionalFeesNames",
      body
    );
    return data;
  },
};
