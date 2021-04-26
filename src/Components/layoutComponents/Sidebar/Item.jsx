import classNames from "classnames";
import { NavLink } from "react-router-dom";

export default function Item({ prop, activeRoute, sidebarClass }) {
  return (
    <div
      className={classNames(
        "nav-item",
        activeRoute(prop.layout + prop.path),
        sidebarClass
      )}
      // className={activeRoute(prop.layout + prop.path)}
    >
      <NavLink
        to={prop.layout + prop.path}
        className={classNames("nav-link", sidebarClass)}
        activeClassName="active"
      >
        <i className={classNames(prop.icon, "menu-icon", sidebarClass)} />
        <p className={classNames("menu-title", sidebarClass)}>{prop.name}</p>
      </NavLink>
    </div>
  );
}
