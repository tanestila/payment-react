import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import * as allRoutes from "../routes";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AbilityContext } from "../Components/Common/Can";
import { Footer } from "../Components/layoutComponents/Footer";
import { Header } from "../Components/layoutComponents/Header";
import { Sidebar } from "../Components/layoutComponents/Sidebar";
import classNames from "classnames";
import { logout } from "../redux/modules/auth/actions";
import { toggleSidebar } from "../redux/modules/sidebar";
import { pushHistory } from "../redux/modules/router";

interface IChildRoute {
  path: string;
  name: string;
  privilege: string;
  component: React.ComponentType<any>;
}

interface IRoute {
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

function Admin({ dispatch, routes }) {
  const [color, setColor] = useState("blue");
  const location = useLocation();
  const [history, setHistory] = useState([
    { name: "Dashboard", path: "/dashboard" },
  ]);

  const mainPanel = React.useRef(null);
  const isHide = useSelector(({ sidebar }: RootStateOrAny) => sidebar.isHide);

  // useEffect(() => {
  //   if (window.innerWidth < 993) dispatch(toggleSidebar());
  // }, []);

  useEffect(() => {
    if (routes.length) {
      let route = routes.filter((route) => {
        console.log(location.pathname.includes(route.path));
        return !route.redirect && location.pathname.includes(route.path);
      });
      console.log(...route);
      console.log(location.pathname);

      if (route.length && route[0].name) {
        setHistory([...history, ...route]);
      }
    }
  }, [location.pathname]);

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
      } else return <Redirect exact from={prop.path!} to={prop.to!} />;
    });
  };

  // const updateDimensions = () => {
  //   if (window.innerWidth <= 991) {
  //     this.props.hideSidebar();
  //   } else {
  //     this.props.showSidebar();
  //   }
  // };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    // if (mainPanel && mainPanel.current) mainPanel.current?.scrollTop = 0;
  }, [location]);

  const handleLogoutClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={routes} isHide={isHide} />
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
