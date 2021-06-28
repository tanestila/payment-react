import { useContext, useState } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Dropdown, Button, Menu } from "antd";
import TransactionDataAudit from "./TransactionData";
import TransactionOverviewsAudit from "./TransactionOverviews";
import TransactionProcessingAudit from "./TransactionProcessing";

const servicesNames = [
  { name: "Transaction data", component: <TransactionDataAudit /> },
  { name: "Transaction overviews", component: <TransactionOverviewsAudit /> },
  { name: "Transaction processing", component: <TransactionProcessingAudit /> },
];

export default function TransactionAudit() {
  const ability = useContext(AbilityContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuClick = (e) => {
    setSelectedIndex(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {servicesNames.map((service, index) => (
        <Menu.Item key={index}>{service.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>{servicesNames[selectedIndex].name}</Button>
      </Dropdown>
      {servicesNames[selectedIndex].component}
    </>
  );
}
