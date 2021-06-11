import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ExpiredPassword } from "./Components/Login/ExpiredPassword";
import Login from "./Components/Login/Login";
import Admin from "./layouts/Admin";
import { initApp } from "./redux/modules/auth/actions";
import { ReactQueryDevtools } from "react-query/devtools";
import { ForgotPassword } from "./Components/Login/ForgotPassword";
import Loading from "./Components/Common/Loading";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );
  const {
    isFirstTimeLogin,
    isCredentialsExpired,
    isCredentialsExpires,
    isInitialized,
  } = useSelector((state: RootStateOrAny) => state.auth);
  // const isCredentialsExpired = useSelector(
  //   (state: RootStateOrAny) => state.auth.isCredentialsExpired
  // );
  // const isCredentialsExpires = useSelector(
  //   (state: RootStateOrAny) => state.auth.isCredentialsExpires
  // );
  // const isInitialized = useSelector(
  //   (state: RootStateOrAny) => state.auth.isInitialized
  // );

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  if (!isInitialized) return <Loading />;

  const PrivateRoute = () => (
    <Route
      path="/"
      render={() =>
        isLoggedIn ? <ExpiredPasswordRoute /> : <Redirect to="/login" />
      }
    />
  );

  console.log(isCredentialsExpired);
  console.log(isLoggedIn);
  const ExpiredPasswordRoute = () => {
    return isLoggedIn && isCredentialsExpired ? (
      <Redirect to="/expired_password" />
    ) : isLoggedIn && isFirstTimeLogin ? (
      <Redirect to="/first_time_login" />
    ) : isLoggedIn && isCredentialsExpires ? (
      <Redirect to="/expires_password" />
    ) : (
      <Admin />
    );
  };
  console.log(ExpiredPasswordRoute());

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/expired_password" component={ExpiredPassword} />
          <Route path="/first_time_login" component={ExpiredPassword} />
          <Route path="/expires_password" component={ExpiredPassword} />
          <Route path="/login" component={Login} />
          <PrivateRoute />
          {ExpiredPasswordRoute()}
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
