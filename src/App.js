import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ExpiredPassword from "./Components/Login/ExpiredPassword";
import Login from "./Components/Login/Login";
import Admin from "./layouts/Admin";
import { initApp } from "./redux/modules/auth/actions";
import { ReactQueryDevtools } from "react-query/devtools";
import Logout from "./Components/Login/Logout";
import ForgotPassword from "./Components/Login/ForgotPassword";

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
  // if (!isLoggedIn) return <Login />;
  // if (isFirstTimeLogin || isCredentialsExpired) return <ExpiredPassword />;

  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={() =>
        !isLoggedIn ? (
          <Route path="/login" component={Login} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
  const LogoutRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  const PrivateRoute = ({ ...rest }) => (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Admin /> : <Redirect to="/login" />)}
    />
  );

  const ExpiredPasswordRoute = ({ ...rest }) => (
    <Route
      {...rest}
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
          <LoginRoute path="/login" component={Login} />
          <LogoutRoute path="/logout" component={Logout} />
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
