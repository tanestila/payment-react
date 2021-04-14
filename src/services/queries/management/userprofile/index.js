import managementService from "../../../management";

export const userprofileAPI = {
  getUserAccount: async (userGuid) => {
    return managementService.get(`/users/profile/${userGuid}`);
  },
  updateUserAccount: async (data, userGuid) => {
    return managementService.post(`/users/profile/${userGuid}`, data);
  },
};
