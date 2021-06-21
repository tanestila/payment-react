import { useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import classNames from "classnames";
import { Header } from "./Header";
import { Item } from "./Item";
import { CollapseItem } from "./CollapseItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type SidebarProps = {
  color: string;
  routes: Array<any>;
  isHide: boolean;
  setState: Function;
};

export const Sidebar: React.FC<SidebarProps> = ({
  color,
  routes,
  isHide,
  setState,
}) => {
  const location = useLocation();
  const collapseItemState = useSelector(
    ({ sidebar }: RootState) => sidebar.collapseItemState
  );

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const onClickItem = (newState: string) => {
    if (collapseItemState === newState) setState("");
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
                    state={collapseItemState}
                    onClickItem={onClickItem}
                    activeRoute={activeRoute}
                    key={key + prop.name}
                    location={location.pathname}
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
