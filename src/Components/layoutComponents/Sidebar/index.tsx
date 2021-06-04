import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Nav } from "react-bootstrap";
import classNames from "classnames";
import { Header } from "./Header";
import { Item } from "./Item";
import { CollapseItem } from "./CollapseItem";
import { useState } from "react";

type SidebarProps = {
  color: string;
  routes: Array<any>;
  isHide: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ color, routes, isHide }) => {
  const location = useLocation();
  let match = useRouteMatch();
  console.log(match);

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const [state, setState] = useState("");

  const onClickItem = (newState: string) => {
    if (state === newState) setState("");
    else setState(newState);
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
            if (!prop.nonNav) {
              if (prop.collapse)
                return (
                  <CollapseItem
                    isHide={isHide}
                    prop={prop}
                    state={state}
                    onClickItem={onClickItem}
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
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
};
