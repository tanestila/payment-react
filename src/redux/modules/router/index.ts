import { Dispatch } from "react";

const types = {
  PUSH_HISTORY: "router/PUSH_HISTORY",
};

const initialState = {
  history: [],
};

export function routerReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.PUSH_HISTORY: {
      let history: Array<any> = [];
      if (action.route.mainName)
        history = [
          { name: action.route.mainName, disabled: true },
          action.route,
        ];
      else history = [action.route];

      return {
        ...state,
        history: history,
      };
    }

    default:
      return { ...state };
  }
}

export const pushHistory = (route) => ({
  type: types.PUSH_HISTORY,
  route,
});
