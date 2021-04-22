import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/modules/sidebar";

function Sidebar({ color, routes }) {
  const dispatch = useDispatch();
  const isHide = useSelector((state) => state.sidebar.isHide);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div
      className={isHide ? " sidebar slideOut" : "sidebar slideIn"}
      data-color={color}
    >
      <div className="sidebar-wrapper">
        <div
          className={isHide ? "logo d-flex slideOut" : "logo d-flex slideIn"}
        >
          <NavLink to="/dashboard" className="logo-mini">
            <div
              id="sidebar-header-logo"
              className={isHide ? "logo-img slideOut" : "logo-img slideIn"}
            >
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          <div
            id="sidebar-hide-button-div"
            className={isHide ? "slideOut" : "slideIn"}
            onClick={() => dispatch(toggleSidebar())}
          >
            <i
              id="sidebar-hide-button"
              className={
                isHide ? "icon-sidebar slideOut" : "icon-sidebar slideIn"
              }
            />
          </div>
        </div>
        {/* Sidebar button  */}

        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
