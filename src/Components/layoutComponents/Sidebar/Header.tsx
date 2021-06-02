import classNames from "classnames";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo.svg";
import { toggleSidebar } from "../../../redux/modules/sidebar";

type HeaderProps = {
  sidebarClass: any;
};

export const Header: React.FC<HeaderProps> = ({ sidebarClass }) => {
  const dispatch = useDispatch();

  return (
    <div className={classNames("logo", "d-flex", sidebarClass)}>
      <NavLink to="/dashboard" className="logo-mini">
        <div className={classNames("logo-img", sidebarClass)}>
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
};
