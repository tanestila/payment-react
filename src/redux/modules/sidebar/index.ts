import { types } from "./types";

const initialState = {
  isHide: false,
};

export function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isHide: !state.isHide,
      };

    default:
      return { ...state };
  }
}

export const toggleSidebar = () => ({
  type: types.TOGGLE_SIDEBAR,
});
