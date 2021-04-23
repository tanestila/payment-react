import React, { useContext, useEffect, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import * as allRoutes from "../routes";

import { useSelector } from "react-redux";
import { AbilityContext } from "../Components/Common/Can";
import { Footer } from "../Components/layoutComponents/Footer";
import Header from "../Components/layoutComponents/Header";
import Sidebar from "../Components/layoutComponents/Sidebar";
import classNames from "classnames";

function Admin() {
  const [color, setColor] = useState("blue");
  const [routes, setRoutes] = useState([]);
  const [initialRoutes, setInitialRoutes] = useState([]);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const permissions = useSelector((state) => state.auth.permissions);
  const role = useSelector((state) => state.auth.role);
  const ability = useContext(AbilityContext);
  const isHide = useSelector((state) => state.sidebar.isHide);

  useEffect(() => {
    switch (role) {
      case "admin":
        setInitialRoutes(allRoutes.adminRoutes);
        break;

      default:
        break;
    }
    let changedRoutes = initialRoutes.map((route) => {
      let [action, subject] = route.privilege.split("_");
      if (ability.can(action, subject)) {
        return route;
      } else return undefined;
    });
    changedRoutes = changedRoutes.filter((r) => r);
    setRoutes(changedRoutes);
  }, [permissions, role, initialRoutes, ability]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          render={(props) => <prop.component {...props} />}
          key={key}
        />
      );
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={routes} />
        <div
          className={classNames("main-panel", {
            slideOut: isHide,
            slideIn: !isHide,
          })}
          ref={mainPanel}
        >
          <Header />
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
