import { types } from "./types";

const initialState = {
  page: 1,
  items: 100,
  isSearch: true,
  sortKey: null,
  sortDirectState: -1,
  sortDirect: null,
};

export function tableReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_NEW_TABLE:
      return {
        ...state,
        page: 1,
        items: 100,
        isSearch: true,
        sortKey: null,
        sortDirectState: -1,
        sortDirect: null,
      };
    case types.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case types.SET_PAGE_SIZE:
      return {
        ...state,
        items: action.items,
      };
    case types.TOGGLE_IS_SEARCH:
      return {
        ...state,
        isSearch: !state.isSearch,
      };
    case types.SET_SORT_KEY:
      let sortDirectState =
        state.sortDirectState !== -1 ? state.sortDirectState - 1 : 1;
      return {
        ...state,
        sortKey: sortDirectState !== 1 ? action.sortKey : null,
        sortDirect: sortDirectState !== 1 ? !!sortDirectState : null,
        sortDirectState,
      };

    default:
      return { ...state };
  }
}

export const setNewTable = () => ({
  type: types.SET_NEW_TABLE,
});

export const setPageTable = (page: number) => ({
  type: types.SET_PAGE,
  page,
});

export const setPageSizeTable = (items: number) => ({
  type: types.SET_PAGE_SIZE,
  items,
});

export const toggleIsSearch = () => ({
  type: types.TOGGLE_IS_SEARCH,
});

export const setSortKey = (key: string) => ({
  type: types.SET_SORT_KEY,
  sortKey: key,
});
