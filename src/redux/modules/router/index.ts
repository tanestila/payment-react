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
      // if (action.route.main) {
      //   return {
      //     ...state,
      //     history: [action.route],
      //   };
      // } else {
      //   // if (state.history.indexOf(action.route)) {

      //   // }
      //   return {
      //     ...state,
      //     // history: [...state.history, action.route],
      //   };
      // }
      return {
        ...state,
        // history: [...state.history, action.route],
      };
    }

    default:
      return { ...state };
  }
}

export const pushHistory = (route: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: types.PUSH_HISTORY,
    route,
  });
};
