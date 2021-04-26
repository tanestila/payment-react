import classNames from "classnames";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";
import { toggleSidebar } from "../../../redux/modules/sidebar";

export default function Header({ sidebarClass }) {
  const dispatch = useDispatch();

  return (
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
  );
}
