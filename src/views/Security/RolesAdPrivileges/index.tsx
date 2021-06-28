import { useContext, useState } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Dropdown, Button, Menu } from "antd";
import Roles from "./Roles";
import Privileges from "./Privileges";

const securityNames = [
  { name: "Roles", component: <Roles /> },
  { name: "Privileges", component: <Privileges /> },
];

export default function RolesAndPrivileges() {
  const ability = useContext(AbilityContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuClick = (e) => {
    setSelectedIndex(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {securityNames.map((service, index) => (
        <Menu.Item key={index}>{service.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>{securityNames[selectedIndex].name}</Button>
      </Dropdown>
      {securityNames[selectedIndex].component}
    </>
  );
}
