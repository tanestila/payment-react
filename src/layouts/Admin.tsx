import React, { useCallback, useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { Footer } from "../Components/layoutComponents/Footer";
import { Header } from "../Components/layoutComponents/Header";
import { Sidebar } from "../Components/layoutComponents/Sidebar";
import classNames from "classnames";
import { flushTokenInStore, logout } from "../redux/modules/auth/actions";
import {
  collapseItemClick,
  hideSidebar,
  showSidebar,
} from "../redux/modules/sidebar";
import { pushHistory } from "../redux/modules/router";
import { AppDispatch } from "../redux/store";
import { updateTokens } from "../services/interceptor";
import { useDebounceFn } from "ahooks";

interface IChildRoute {
  path: string;
  name: string;
  privilege: string;
  component: React.ComponentType<any>;
}

interface IRoute {
  mainName?: string;
  nonNav?: boolean;
  path?: string;
  redirect?: boolean;
  to?: string;
  collapse?: boolean;
  name?: string;
  icon?: string;
  state?: string;
  component?: React.ComponentType<any>;
  privilege?: string;
  views?: Array<IChildRoute>;
}

type AdminProps = {
  dispatch: AppDispatch;
  routes: Array<IRoute>;
};

function Admin({ dispatch, routes }: AdminProps) {
  const [color, setColor] = useState("blue");
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const isHide = useSelector(({ sidebar }: RootStateOrAny) => sidebar.isHide);
  const history = useSelector(({ router }: RootStateOrAny) => router.history);

  const updateDimensions = () => {
    if (window.innerWidth <= 991) {
      !isHide && dispatch(hideSidebar());
    } else {
      isHide && dispatch(showSidebar());
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => updateDimensions());
    return window.removeEventListener("resize", () => updateDimensions());
  }, []);

  useEffect(() => {
    if (routes.length) {
      routes.forEach((r) => {
        if (r.collapse)
          r.views.forEach((c) => {
            if (location.pathname.includes(c.path))
              dispatch(pushHistory({ ...c, mainName: r.name, new: true }));
          });
        else if (!r.redirect && !r.nonNav && location.pathname.includes(r.path))
          dispatch(pushHistory(r));
        else if (
          r.nonNav &&
          location.pathname.includes(r.path.replace(":id", ""))
        )
          dispatch(pushHistory(r));
      });
    }
  }, [location.pathname, routes, dispatch]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    // if (mainPanel && mainPanel.current) mainPanel.current?.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes: Array<IRoute>) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return prop.views?.map((item, key) => {
          return (
            <Route
              path={item.path}
              component={item.component}
              // render={(props) => <item.component {...props} />}
              key={key + item.name}
            />
          );
        });
      } else if (!prop.redirect) {
        return (
          <Route path={prop.path!} component={prop.component!} key={key} />
        );
      } else
        return (
          <Redirect
            exact
            from={prop.path!}
            to={prop.to!}
            key={key + prop.name!}
          />
        );
    });
  };

  const handleLogoutClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onTimeOut = useCallback(() => {
    dispatch(flushTokenInStore("Token expired"));
  }, [dispatch]);

  const setState = useCallback(
    (path) => {
      dispatch(collapseItemClick(path));
    },
    [dispatch]
  );

  const onMouseMove = async () => {
    await updateTokens();
  };

  const { run } = useDebounceFn(onMouseMove, {
    wait: 500,
  });

  return (
    <>
      <div className="wrapper" onMouseMove={run}>
        <Sidebar
          color={color}
          routes={routes}
          isHide={isHide}
          setState={setState}
        />
        <div
          className={classNames("main-panel", {
            slideOut: isHide,
            slideIn: !isHide,
          })}
          ref={mainPanel}
        >
          <Header
            handleLogoutClick={handleLogoutClick}
            headerHistory={history}
            onTimeOut={onTimeOut}
          />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
