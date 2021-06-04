import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
// @ts-ignore
import apiFile from "../../../public/api.pdf";
import { MouseEventHandler } from "react";
// import routes from "routes.js";
import { Timer } from "./Timer";

type HeaderProps = {
  handleLogoutClick: MouseEventHandler<HTMLAnchorElement>;
};

export const Header: React.FC<HeaderProps> = ({ handleLogoutClick }) => {
  // const location = useLocation();
  const history = useHistory();
  // console.log(location);
  // console.log(history);

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

  // const getBrandText = () => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };
  return (
    <Navbar expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={(e: any) => e.preventDefault()}
            className="mr-2"
          >
            {/* {getBrandText()} */}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link disabled className="m-0">
                <Timer />
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
