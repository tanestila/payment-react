import managementService from "../../../management";

export const usersAPI = {
  checkExists: async (data) => {
    return managementService.post(`/users/exists`, data);
  },
};
