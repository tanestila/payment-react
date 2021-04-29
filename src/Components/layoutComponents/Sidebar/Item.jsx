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
    >
      <NavLink
        to={prop.layout + prop.path}
        className={classNames("nav-link", "d-flex", sidebarClass)}
        activeClassName="active"
      >
        <i className={classNames(prop.icon, "menu-icon", sidebarClass)} />
        <span className={classNames("menu-title", sidebarClass)}>
          {prop.name}
        </span>
      </NavLink>
    </div>
  );
}
