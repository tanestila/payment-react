import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ExpiredPassword from "./Components/Login/ExpiredPassword";
import Login from "./Components/Login/Login";
import Admin from "./layouts/Admin";
import { initApp } from "./redux/modules/auth/actions";
import { ReactQueryDevtools } from "react-query/devtools";
import Logout from "./Components/Login/Logout";
import ForgotPassword from "./Components/Login/ForgotPassword";
import Loading from "./Components/Common/Loading";

type RouteType = {
  path: string;
};

type RouteWithComponentType = {
  path: string;
  Component: React.FunctionComponent<any>;
};

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );
  const isFirstTimeLogin = useSelector(
    (state: RootStateOrAny) => state.auth.isFirstTimeLogin
  );
  const isCredentialsExpired = useSelector(
    (state: RootStateOrAny) => state.auth.isCredentialsExpired
  );
  const isInitialized = useSelector(
    (state: RootStateOrAny) => state.auth.isInitialized
  );

  useEffect(() => {
    dispatch(initApp());
  }, []);

  if (!isInitialized) return <Loading />;
  // if (!isLoggedIn) return <Login />;
  // if (isFirstTimeLogin || isCredentialsExpired) return <ExpiredPassword />;

  const LoginRoute = (props: RouteType) => (
    <Route
      path={props.path}
      render={() =>
        !true ? <Route path="/login" component={Login} /> : <Redirect to="/" />
      }
    />
  );
  const LogoutRoute = (props: RouteWithComponentType) => {
    const { Component } = props;
    return (
      <Route
        path={props.path}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  const PrivateRoute = (props: RouteType) => (
    <Route
      path={props.path}
      render={() => (true ? <Admin /> : <Redirect to="/login" />)}
    />
  );

  const ExpiredPasswordRoute = (props: RouteType) => (
    <Route
      path={props.path}
      render={() =>
        isLoggedIn && isCredentialsExpired ? (
          <Route path="/expired_password" component={ExpiredPassword} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <LoginRoute path="/login" />
          <LogoutRoute path="/logout" Component={Logout} />
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
          <ExpiredPasswordRoute path="/expired_password" />
          <PrivateRoute path="/" />
          {/* <Route path="/">
            <Admin />
          </Route> */}
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
