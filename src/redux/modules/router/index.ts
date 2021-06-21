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
      let flag = false;
      state.history.forEach((item) => {
        if (item.name.toLowerCase() === action.route.name.toLowerCase()) {
          flag = true;
        }
      });
      if (!flag) {
        let history: Array<any> = [];
        if (action.route.mainName)
          if (
            state.history[0] &&
            state.history[0].name === action.route.mainName.toUpperCase() &&
            !action.route.new
          )
            history = [...state.history, action.route];
          else
            history = [
              { name: action.route.mainName.toUpperCase(), disabled: true },
              action.route,
            ];
        else history = [action.route];

        return {
          ...state,
          history: history,
        };
      } else
        return {
          ...state,
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
