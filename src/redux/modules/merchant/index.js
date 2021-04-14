import { types } from "./types";

const initialState = {
  merchants: [],
};

export function merchantReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MERCHANTS:
      return {
        ...state,
        merchants: action.merchants,
      };

    default:
      return { ...state };
  }
}
