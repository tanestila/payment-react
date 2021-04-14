import { merchantAPI } from "../../../services/queries/management/merchant";
import { types } from "./types";

export const getMerchants = () => async (dispatch) => {
  try {
    let { data } = await merchantAPI.getMerchants();
    dispatch({
      type: types.GET_MERCHANTS,
      merchants: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
