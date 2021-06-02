import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import * as allRoutes from "../routes";
import { useDispatch, useSelector } from "react-redux";
import { AbilityContext } from "../Components/Common/Can";
import { Footer } from "../Components/layoutComponents/Footer";
import Header from "../Components/layoutComponents/Header";
import Sidebar from "../Components/layoutComponents/Sidebar";
import classNames from "classnames";
import { logout } from "../redux/modules/auth/actions";

function Admin() {
  const [color, setColor] = useState("blue");
  const [routes, setRoutes] = useState([]);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const role = useSelector(({ auth }) => auth.role);
  const ability = useContext(AbilityContext);
  const isHide = useSelector(({ sidebar }) => sidebar.isHide);
  const dispatch = useDispatch();

  useEffect(() => {
    let initialRoutes = [];
    switch (role) {
      case "admin":
        initialRoutes = allRoutes.adminRoutes;
        break;
      case "merchant":
        initialRoutes = allRoutes.merchantRoutes;
        break;
      case "group":
        initialRoutes = allRoutes.groupRoutes;
        break;
      case "partner":
        initialRoutes = allRoutes.partnerRoutes;
        break;

      default:
        break;
    }

    // setInitialRoutes(allRoutes.adminRoutes);
    let changedRoutes = initialRoutes.map((route) => {
      if (route.privilege) {
        let [action, subject] = route.privilege.split("_");
        if (ability.can(action, subject)) {
          return route;
        } else return undefined;
      } else return route;
    });

    changedRoutes = changedRoutes.filter((r) => r);
    setRoutes(changedRoutes);
  }, []);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return prop.views.map((item, key) => {
          return (
            <Route
              path={item.path}
              render={(props) => <item.component {...props} />}
              key={key + item.name}
            />
          );
        });
      } else
        return (
          <Route
            path={prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
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
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
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
          <Header handleLogoutClick={handleLogoutClick} />
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
