import { profileAPI } from "../../../services/queries/management/users/profile";
import { types } from "./types";

export const getUserAccount = () => async (dispatch) => {
  try {
    let { data } = await profileAPI.getUserAccount();
    dispatch({
      type: types.GET_USERPROFILE,
      profile: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAccount = (body, loginGuid) => async (dispatch) => {
  try {
    let { data } = await profileAPI.updateUserAccount(body, loginGuid);
    dispatch({
      type: types.UPDATE_USERPROFILE,
      profile: data,
    });
  } catch (error) {
    console.log(error);
  }
};
