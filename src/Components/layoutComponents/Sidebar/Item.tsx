import classNames from "classnames";
import { NavLink } from "react-router-dom";

type ItemProp = {
  prop: any;
  activeRoute: Function;
  sidebarClass: any;
};

export const Item: React.FC<ItemProp> = ({
  prop,
  activeRoute,
  sidebarClass,
}) => {
  return (
    <div
      className={classNames("nav-item", activeRoute(prop.path), sidebarClass)}
    >
      <NavLink
        to={prop.path}
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
};
