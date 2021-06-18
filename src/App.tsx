import { useContext, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ExpiredPassword } from "./Components/Login/ExpiredPassword";
import Login from "./Components/Login/Login";
import Admin from "./layouts/Admin";
import { initApp } from "./redux/modules/auth/actions";
import { ReactQueryDevtools } from "react-query/devtools";
import { ForgotPassword } from "./Components/Login/ForgotPassword";
import Loading from "./Components/Common/Loading";
import * as allRoutes from "./routes";
import { AbilityContext } from "./Components/Common/Can";
import { pushHistory } from "./redux/modules/router";

function App() {
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);

  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );
  const isFirstTimeLogin = useSelector(
    (state: RootStateOrAny) => state.auth.isFirstTimeLogin
  );
  const isCredentialsExpired = useSelector(
    (state: RootStateOrAny) => state.auth.isCredentialsExpired
  );
  const isCredentialsExpires = useSelector(
    (state: RootStateOrAny) => state.auth.isCredentialsExpires
  );
  const isInitialized = useSelector(
    (state: RootStateOrAny) => state.auth.isInitialized
  );
  const role = useSelector((state: RootStateOrAny) => state.auth.role);
  const [routes, setRoutes] = useState<Array<any>>([]);
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

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      let initialRoutes: Array<any> = [];

      switch (role) {
        case "admin":
          initialRoutes = [...allRoutes.adminRoutes, ...allRoutes.adminNonNav];
          break;
        case "merchant":
          initialRoutes = [
            ...allRoutes.merchantRoutes,
            ...allRoutes.adminNonNav,
          ];

          break;
        case "group":
          initialRoutes = [...allRoutes.groupRoutes, ...allRoutes.adminNonNav];

          break;
        case "partner":
          initialRoutes = [
            ...allRoutes.partnerRoutes,
            ...allRoutes.adminNonNav,
          ];

          break;

        default:
          break;
      }
      let changedRoutes = initialRoutes.map((route) => {
        if (route.privilege) {
          let [action, subject] = route.privilege.split("_");
          if (ability.can(action, subject)) {
            return route;
          } else return undefined;
        } else return route;
      });

      changedRoutes = changedRoutes.filter((r: any) => r);
      setRoutes(changedRoutes);
    }
    return () => {
      setRoutes([]);
    };
  }, [ability, role]);

  if (!isInitialized) return <Loading />;

  const PrivateRoute = () => (
    <Route
      path="/"
      render={() =>
        isLoggedIn ? <ExpiredPasswordRoute /> : <Redirect to="/login" />
      }
    />
  );

  const ExpiredPasswordRoute = () => {
    return isLoggedIn && isCredentialsExpired ? (
      <Redirect to="/expired_password" />
    ) : isLoggedIn && isFirstTimeLogin ? (
      <Redirect to="/first_time_login" />
    ) : isLoggedIn && isCredentialsExpires ? (
      <Redirect to="/expires_password" />
    ) : (
      <Admin dispatch={dispatch} routes={routes} />
    );
  };
  // console.log(ExpiredPasswordRoute());

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
