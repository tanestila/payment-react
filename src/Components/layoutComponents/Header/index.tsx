import { useHistory, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
// @ts-ignore
import apiFile from "../../../public/api.pdf";
import { MouseEventHandler } from "react";
// import routes from "routes.js";
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

  // const mobileSidebarToggle = (e) => {
  //   e.preventDefault();
  //   document.documentElement.classList.toggle("nav-open");
  //   var node = document.createElement("div");
  //   node.id = "bodyClick";
  //   node.onclick = function () {
  //     this.parentElement.removeChild(this);
  //     document.documentElement.classList.toggle("nav-open");
  //   };
  //   document.body.appendChild(node);
  // };
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Nav className="mr-auto header-history">
          {/* {headerHistory.map((h, i) => (
            <>
              <Nav.Link disabled={h.disabled} className="m-0">
                {h.disabled ? (
                  <span key={`${i}${h.name}`}>{h.name}</span>
                ) : (
                  <NavLink to={h.path} key={`${i}${h.name}`}>
                    {h.name}
                  </NavLink>
                )}
              </Nav.Link>
              {i !== headerHistory.length - 1 && (
                <span style={{ paddingTop: "10px" }}>{">"}</span>
              )}
            </>
          ))} */}

          <Breadcrumb separator=">">
            {headerHistory.map((h, i) => (
              <Breadcrumb.Item>
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
        {/* <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span> */}
        {/* </Navbar.Toggle> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link disabled className="m-0">
                <span style={{ paddingTop: "3px" }}>
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

            {/* <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Another action
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
