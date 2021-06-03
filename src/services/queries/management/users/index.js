import managementService from "../../../management";

export const usersAPI = {
  updateUserAccount: async (data) => {
    return managementService.post(`/users/exists`, data);
  },
};
