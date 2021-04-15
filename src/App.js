import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import ExpiredPassword from "./Components/Login/ExpiredPassword";
import Login from "./Components/Login/Login";
import Preferences from "./Components/Preferences/Preferences";
import { initApp } from "./redux/modules/auth/actions";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isFirstTimeLogin = useSelector((state) => state.auth.isFirstTimeLogin);
  const isCredentialsExpired = useSelector(
    (state) => state.auth.isCredentialsExpired
  );
  const isInitialized = useSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    dispatch(initApp());
  }, []);

  if (!isInitialized) return <div>loading</div>;
  if (!isLoggedIn) return <Login />;
  if (isFirstTimeLogin || isCredentialsExpired) return <ExpiredPassword />;
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
