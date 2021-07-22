import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("With React Testing Library", () => {
  const initialState = { auth: { isLoggedIn: false, isFirstTimeLogin: false } };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store, wrapper;

  it('Shows "Hello world!"', async () => {
    // store = mockStore(initialState);
    // const { getByText } = render(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
    // await waitFor(() => getByText("Hello Worldd!"));
    // expect(getByText("Hello Worldd!")).not.toBeNull();
  });
});
