import { useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Header from "./Header";
import Item from "./Item";
import CollapseItem from "./CollapseItem";

function Sidebar({ color, routes }) {
  const isHide = useSelector((state) => state.sidebar.isHide);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
  };

  return (
    <div className={classNames("sidebar", sidebarClass)} data-color={color}>
      <div className="sidebar-wrapper">
        <Header sidebarClass={sidebarClass} />

        <Nav>
          {routes.map((prop, key) => {
            if (prop.collapse)
              return (
                <CollapseItem
                  prop={prop}
                  activeRoute={activeRoute}
                  key={key + prop.name}
                />
              );
            else if (!prop.redirect)
              return (
                <Item
                  prop={prop}
                  key={key + prop.name}
                  activeRoute={activeRoute}
                  sidebarClass={sidebarClass}
                />
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
