import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";
import { Nav } from "react-bootstrap";

function Sidebar({ color, routes }) {
  const [isHide, setisHide] = useState(false);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-color={color}>
      <div className="sidebar-wrapper">
        {/* <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >

          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Creative Tim
          </a>
        </div> */}
        <div
          className={isHide ? "logo d-flex slideOut" : "logo d-flex slideIn"}
          style={{ position: "absolute" }}
        >
          <NavLink to="/dashboard" className="simple-text logo-mini">
            <div
              id="sidebar-header-logo"
              className={isHide ? "logo-img slideOut" : "logo-img slideIn"}
            >
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
        </div>
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
