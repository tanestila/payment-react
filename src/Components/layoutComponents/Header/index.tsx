import { useHistory, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import apiFile from "../../../public/api.pdf";
import { MouseEventHandler } from "react";
import { Timer } from "./Timer";
import { Breadcrumb } from "antd";

type HeaderProps = {
  handleLogoutClick: MouseEventHandler<HTMLAnchorElement>;
  headerHistory: Array<any>;
  onTimeOut: Function;
};

export const Header: React.FC<HeaderProps> = ({
  handleLogoutClick,
  headerHistory,
  onTimeOut,
}) => {
  const history = useHistory();
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Nav className="mr-auto header-history">
          <Breadcrumb separator=">">
            {headerHistory.map((h, i) => (
              <Breadcrumb.Item key={h.name + i}>
                {h.disabled ? (
                  <span key={`${i}${h.name}`}>{h.name}</span>
                ) : (
                  <NavLink to={h.path} key={`${i}${h.name}`}>
                    {h.name}
                  </NavLink>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link disabled className="m-0">
                <span style={{ paddingTop: "3px", width: "205px" }}>
                  Your session will expire in <Timer onTimeOut={onTimeOut} />
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id="profile"
                className="m-0"
                onClick={() => history.push("/admin/useraccount")}
              >
                <i className=" icon-user_ico">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                </i>
                <span>Account</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                id="docs"
                className="m-0"
                onClick={() => {
                  window.open(apiFile);
                }}
              >
                <i className="icon-doc" />
                <span>Docs</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link id="logout" className="m-0" onClick={handleLogoutClick}>
                <i className="icon-logout" />
                <span>Logout</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
