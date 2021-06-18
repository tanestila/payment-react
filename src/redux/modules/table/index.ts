const types = {
  SET_NEW_TABLE: "table/SET_NEW_TABLE",
  SET_PAGE: "table/SET_PAGE",
  SET_ITEMS: "table/SET_ITEMS",
  SET_SEARCH: "table/SET_SEARCH",
  SET_SORT: "table/SET_SORT",
};

const initialState = {
  name: "",
  page: 1,
  items: 100,
  search: {},
  sort: {},
};

export function tableReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_NEW_TABLE: {
      if (state.name === action.name) return { ...state };
      else
        return {
          ...state,
          name: action.name,
          page: 1,
          items: 100,
          search: {},
          sort: {},
        };
    }

    case types.SET_PAGE: {
      return { ...state, page: action.page };
    }

    case types.SET_ITEMS: {
      return { ...state, items: action.items };
    }

    case types.SET_SEARCH: {
      return { ...state, search: action.search };
    }

    case types.SET_SORT: {
      return { ...state, sort: action.sort };
    }

    default:
      return { ...state };
  }
}

export const setNewTable = (name) => ({
  type: types.SET_NEW_TABLE,
  name,
});

export const setTablePage = (page) => ({
  type: types.SET_PAGE,
  page,
});

export const setTableItems = (items) => ({
  type: types.SET_ITEMS,
  items,
});

export const setTableSearch = (search) => ({
  type: types.SET_SEARCH,
  search,
});

export const setTableSort = (sort) => ({
  type: types.SET_SORT,
  sort,
});
