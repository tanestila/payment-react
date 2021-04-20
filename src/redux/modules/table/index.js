import { types } from "./types";

const initialState = {
  page: 1,
  items: 10,
};

export function tableReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NEW_TABLE:
      return {
        ...state,
        page: 1,
      };
    case types.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return { ...state };
  }
}

export const setNewTable = () => ({
  type: types.SET_NEW_TABLE,
});

export const setPageTable = (page) => ({
  type: types.SET_PAGE,
  page,
});
