import { useLocation, NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";
import { Collapse, Dropdown, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/modules/sidebar";
import classNames from "classnames";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useState } from "react";

function Sidebar({ color, routes }) {
  const dispatch = useDispatch();
  const isHide = useSelector((state) => state.sidebar.isHide);
  const location = useLocation();
  const [dropdownOpen, setOpen] = useState(false);
  const [state, setState] = useState();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const toggle = () => {
    if (isHide) setOpen(!dropdownOpen);
  };

  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
  };

  return (
    <div className={classNames("sidebar", sidebarClass)} data-color={color}>
      <div className="sidebar-wrapper">
        <div className={classNames("logo", "d-flex", sidebarClass)}>
          <NavLink to="/dashboard" className="logo-mini">
            <div
              id="sidebar-header-logo"
              className={classNames("logo-img", sidebarClass)}
            >
              <img src={logo} alt="logo" />
            </div>
          </NavLink>
          <div
            id="sidebar-hide-button-div"
            className={classNames(sidebarClass)}
            onClick={() => dispatch(toggleSidebar())}
          >
            <i
              id="sidebar-hide-button"
              className={classNames("icon-sidebar", sidebarClass)}
            />
          </div>
        </div>
        {/* Sidebar button  */}

        <Nav>
          {routes.map((prop, key) => {
            if (prop.collapse)
              <li
                className={classNames(
                  "nav-item",
                  activeRoute(prop.layout + prop.path),
                  sidebarClass
                )}
                key={key}
              >
                <Dropdown
                  onMouseOver={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  direction="right"
                  isOpen={isHide ? dropdownOpen : false}
                  toggle={toggle}
                  onClick={() => !isHide && setState(prop.state)}
                  aria-controls={prop.state}
                  aria-expanded={prop.path === state}
                >
                  <DropdownToggle
                    className={classNames("nav-link", sidebarClass)}
                  >
                    <i className={classNames("menu-icon", sidebarClass)} />
                    <span className={classNames("menu-title", sidebarClass)}>
                      {prop.name}
                    </span>
                    <i
                      className={classNames(
                        "fas",
                        "fa-angle-right",
                        "caret",
                        sidebarClass,
                        { open: prop.state === state }
                      )}
                    />
                  </DropdownToggle>
                  <DropdownMenu
                    tag="ul"
                    className="nav-menu"
                    id={prop.state}
                    style={{ top: "0px", left: "75px" }}
                  >
                    <li
                      className={"nav-item menu-header"}
                      key={key}
                      disabled={true}
                    >
                      <p className="menu-title">{prop.name}</p>
                    </li>
                    {prop.views.map((child, key) => {
                      return (
                        <SidebarCollapseItem
                          key={key}
                          child={child}
                          isHide={isHide}
                        />
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
                <Collapse in={prop.state === state}>
                  <ul
                    className="nav-menu"
                    id={prop.state}
                    // style={{ marginTop: "-5px" }}
                  >
                    {prop.views.map((child, key) => {
                      return (
                        <SidebarCollapseItem
                          key={key}
                          child={child}
                          isHide={isHide}
                        />
                      );
                    })}
                  </ul>
                </Collapse>
              </li>;
            else if (!prop.redirect)
              return (
                <li
                  className={classNames(
                    "nav-item",
                    activeRoute(prop.layout + prop.path),
                    sidebarClass
                  )}
                  // className={activeRoute(prop.layout + prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className={classNames("nav-link", sidebarClass)}
                    activeClassName="active"
                  >
                    <i className={classNames(prop.icon, sidebarClass)} />
                    <p className={classNames("menu-title", sidebarClass)}>
                      {prop.name}
                    </p>
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

function SidebarCollapseItem({ isHide, child, key }) {
  return (
    <li className={"nav-item "} key={key}>
      <NavLink
        id="sidebar-text-icon-active"
        title={isHide ? child.name : ""}
        className={isHide ? "nav-link slideOut " : "nav-link slideIn "}
        to={child.path}
        activeClassName=""
      >
        <i className="menu-icon">•</i>

        <p className="menu-title">{child.name}</p>
      </NavLink>
    </li>
  );
}
