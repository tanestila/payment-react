import { types } from "./types";

const initialState = {
  profile: {},
};

export function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERPROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case types.UPDATE_USERPROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return { ...state };
  }
}
