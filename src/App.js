import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Preferences from "./Components/Preferences/Preferences";
import { initApp } from "./redux/modules/auth/auth";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isInitialized = useSelector((state) => state.auth.isInitialized);

  useEffect(() => {
    dispatch(initApp());
  }, []);

  if (!isInitialized) return <div>loading</div>;
  if (!isLoggedIn) return <Login />;

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
