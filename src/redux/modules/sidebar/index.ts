const types = {
  TOGGLE_SIDEBAR: "sidebar/TOGGLE_SIDEBAR",
  COLLAPSE_ITEM_CLICK: "sidebar/COLLAPSE_ITEM_CLICK",
  SHOW_SIDEBAR: "sidebar/SHOW_SIDEBAR",
  HIDE_SIDEBAR: "sidebar/HIDE_SIDEBAR",
};

const initialState = {
  isHide: false,
  collapseItemState: "",
};

export function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR: {
      return {
        ...state,
        isHide: !state.isHide,
        collapseItemState: "",
      };
    }
    case types.SHOW_SIDEBAR: {
      return {
        ...state,
        isHide: false,
        collapseItemState: "",
      };
    }
    case types.HIDE_SIDEBAR: {
      return {
        ...state,
        isHide: true,
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

export const showSidebar = () => ({
  type: types.SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: types.HIDE_SIDEBAR,
});

export const collapseItemClick = (statePath: any) => ({
  type: types.COLLAPSE_ITEM_CLICK,
  state: statePath,
});
