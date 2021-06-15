const types = {
  TOGGLE_SIDEBAR: "sidebar/TOGGLE_SIDEBAR",
  COLLAPSE_ITEM_CLICK: "sidebar/COLLAPSE_ITEM_CLICK",
};

const initialState = {
  isHide: false,
  collapseItemState: "",
  activeItemPath: "",
};

export function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR: {
      let isHide = state.isHide;
      return {
        ...state,
        isHide: !isHide,
        collapseItemState: "",
      };
    }

    case types.COLLAPSE_ITEM_CLICK:
      return {
        ...state,
        collapseItemState:
          action.state === state.collapseItemState ? "" : action.state,
      };

    default:
      return { ...state };
  }
}

export const toggleSidebar = () => ({
  type: types.TOGGLE_SIDEBAR,
});

export const collapseItemClick = (statePath: any) => ({
  type: types.COLLAPSE_ITEM_CLICK,
  state: statePath,
});
