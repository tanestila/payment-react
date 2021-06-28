import classNames from "classnames";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

type CollapseItemProp = {
  prop: any;
  activeRoute: Function;
  onClickItem: Function;
  state: string;
  isHide: boolean;
  location: string;
};

export const CollapseItem: React.FC<CollapseItemProp> = ({
  prop,
  activeRoute,
  onClickItem,
  state: collapseItemState,
  isHide,
  location,
}) => {
  const [dropdownOpen, setOpen] = useState(false);
  const hideClass = isHide ? " hover-open " : " collapsed-menu ";

  const toggle = () => {
    if (isHide) setOpen(!dropdownOpen);
  };

  const click = () => {
    if (!isHide) onClickItem(prop.state);
  };

  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
  };

  const onToggleActive = () => {
    if (prop.state === collapseItemState) return true;
    else {
      let urlsArray: Array<string> = [];
      prop.views.forEach((child: any) => {
        urlsArray.push(child.path);
        if (child.activeNonNavRoutes)
          urlsArray.push(...child.activeNonNavRoutes);
      });
      let flag = false;
      urlsArray.forEach((url) => {
        if (location.includes(url)) flag = true;
      });
      return flag;
    }
  };

  return (
    <div
      className={classNames(
        "nav-item",
        hideClass,
        {
          "hover-open": isHide,
          "collapsed-menu": !isHide,
        },
        activeRoute(prop.path),
        sidebarClass
      )}
    >
      <Dropdown
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        direction="right"
        isOpen={isHide ? dropdownOpen : false}
        toggle={toggle}
        onClick={click}
        aria-controls={prop.state}
        aria-expanded={prop.path === collapseItemState}
        // isOpen={true}
      >
        <DropdownToggle
          className={classNames("nav-link", "d-flex", sidebarClass, {
            active: onToggleActive(),
          })}
        >
          <i className={classNames("menu-icon", prop.icon, sidebarClass)} />
          <span className={classNames("menu-title", sidebarClass)}>
            {prop.name}
          </span>
          <i
            className={classNames(
              "fas",
              "fa-angle-right",
              "caret",
              sidebarClass,
              { open: prop.state === collapseItemState }
            )}
          />
        </DropdownToggle>
        <DropdownMenu
          tag="ul"
          className="nav-menu"
          id={prop.state}
          style={{ top: "0px", left: "75px" }}
        >
          <li className={"nav-item menu-header"} key={prop.name + "_header"}>
            <p className="menu-title">{prop.name}</p>
          </li>
          {prop.views.map((child: any, key: number) => {
            return (
              <SidebarCollapseItem
                key={key + prop.name + "_dropdown"}
                child={child}
                isHide={isHide}
                activeRoute={activeRoute}
              />
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <Collapse in={prop.state === collapseItemState}>
        <div className="nav-menu" id={prop.state}>
          {prop.views.map((child: any, key: number) => {
            return (
              <SidebarCollapseItem
                key={key + prop.name + "_collapse"}
                child={child}
                isHide={isHide}
                activeRoute={activeRoute}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

type SidebarCollapseItemProp = {
  child: any;
  isHide: boolean;
  activeRoute: Function;
};

const SidebarCollapseItem: React.FC<SidebarCollapseItemProp> = ({
  isHide,
  child,
  activeRoute,
}) => {
  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
  };

  return (
    <li className={"nav-item "}>
      <NavLink
        id="sidebar-text-icon-active"
        title={isHide ? child.name : ""}
        className={classNames(
          "nav-link",
          "d-flex",
          sidebarClass,
          activeRoute(child.path)
        )}
        to={child.path}
        activeClassName=""
      >
        <i className="menu-icon">•</i>

        <p className="menu-title">{child.name}</p>
      </NavLink>
    </li>
  );
};
