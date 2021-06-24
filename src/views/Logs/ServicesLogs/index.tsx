import { useContext, useState } from "react";
import { AbilityContext } from "../../../Components/Common/Can";
import { Dropdown, Button, Menu } from "antd";
import DectaRecotServiceLogs from "./DectaRecot";
import ChargebacksServiceLogs from "./Chargebacks";
import LoginExpiredServiceLogs from "./LoginExpired";
import CurrencyExchangeServiceLogs from "./CurrencyExchange";
import DeleteCardServiceLogs from "./DeleteCardData";
import RecurringServiceLogs from "./Recurring";

const servicesNames = [
  { name: "Decta Recot Service", component: <DectaRecotServiceLogs /> },
  { name: "Chargebacks Service", component: <ChargebacksServiceLogs /> },
  { name: "Login Expired Service", component: <LoginExpiredServiceLogs /> },
  {
    name: "Currency Exchange Service",
    component: <CurrencyExchangeServiceLogs />,
  },
  { name: "Delete Card Data Service", component: <DeleteCardServiceLogs /> },
  { name: "Recurring Service", component: <RecurringServiceLogs /> },
];

export default function ServicesLogs() {
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
