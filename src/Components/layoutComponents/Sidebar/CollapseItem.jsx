import classNames from "classnames";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { collapseItemClick } from "../../../redux/modules/sidebar";

export default function CollapseItem({ prop, activeRoute }) {
  const dispatch = useDispatch();
  const { isHide, collapseItemState } = useSelector((state) => state.sidebar);
  const [dropdownOpen, setOpen] = useState(false);
  const hideClass = isHide ? " hover-open " : " collapsed-menu ";

  const toggle = () => {
    if (isHide) setOpen(!dropdownOpen);
  };

  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
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
        onClick={() => !isHide && dispatch(collapseItemClick(prop.state))}
        aria-controls={prop.state}
        aria-expanded={prop.path === collapseItemState}
        // isOpen={true}
      >
        <DropdownToggle
          className={classNames("nav-link", "d-flex", sidebarClass)}
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
          <li
            className={"nav-item menu-header"}
            key={prop.name + "_header"}
            disabled={true}
          >
            <p className="menu-title">{prop.name}</p>
          </li>
          {prop.views.map((child, key) => {
            return (
              <SidebarCollapseItem
                key={key + prop.name + "_dropdown"}
                child={child}
                isHide={isHide}
              />
            );
          })}
        </DropdownMenu>
      </Dropdown>
      <Collapse in={prop.state === collapseItemState}>
        <div className="nav-menu" id={prop.state}>
          {prop.views.map((child, key) => {
            return (
              <SidebarCollapseItem
                key={key + prop.name + "_collapse"}
                child={child}
                isHide={isHide}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
}

function SidebarCollapseItem({ isHide, child }) {
  const sidebarClass = {
    slideOut: isHide,
    slideIn: !isHide,
  };

  return (
    <li className={"nav-item "}>
      <NavLink
        id="sidebar-text-icon-active"
        title={isHide ? child.name : ""}
        className={classNames("nav-link", "d-flex", sidebarClass)}
        to={child.path}
        activeClassName=""
      >
        <i className="menu-icon">•</i>

        <p className="menu-title">{child.name}</p>
      </NavLink>
    </li>
  );
}
