import { useContext, useState } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Dropdown, Button, Menu } from "antd";
import GroupsAudit from "./Groups";
import LoginsAudit from "./Logins";
import MerchantsAudit from "./Merchants";
import PartnersAudit from "./Partners";

const auditNames = [
  { name: "Merchants", component: <MerchantsAudit /> },
  { name: "Groups", component: <GroupsAudit /> },
  { name: "Partners", component: <PartnersAudit /> },
  { name: "Logins", component: <LoginsAudit /> },
];

export default function UsersAudit() {
  const ability = useContext(AbilityContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuClick = (e) => {
    setSelectedIndex(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {auditNames.map((service, index) => (
        <Menu.Item key={index}>{service.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>{auditNames[selectedIndex].name}</Button>
      </Dropdown>
      {auditNames[selectedIndex].component}
    </>
  );
}
