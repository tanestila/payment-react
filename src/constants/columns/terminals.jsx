import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import { Button } from "antd";

export default function useTerminalsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Gateway",
        dataIndex: "gateway_name",
        key: "gateway_name",
      },
      {
        title: "Payment amount limit",
        dataIndex: "payment_amount_limit",
        key: "payment_amount_limit",
      },

      {
        title: "Monthly amount limit",
        dataIndex: "monthly_amount_limit",
        key: "monthly_amount_limit",
      },
      {
        title: "3d",
        dataIndex: "three_d",
        key: "three_d",
        render: (text) => (
          <i
            className={
              text ? "icon-success green icon" : "icon-failed red icon"
            }
          />
        ),
      },
      {
        title: "Enabled",
        dataIndex: "enabled",
        key: "enabled",
        render: (text) => (
          <i
            className={
              text ? "icon-success green icon" : "icon-failed red icon"
            }
          />
        ),
      },
      {
        title: "Antifraud monitor value",
        dataIndex: "antifraud_monitor_value",
        key: "antifraud_monitor_value",
      },
      {
        title: "Antifraud monitor",
        dataIndex: "antifraud_monitor",
        key: "antifraud_monitor",
        render: (text) => (
          <i
            className={
              text ? "icon-success green icon" : "icon-failed red icon"
            }
          />
        ),
      },
      ability.can("READ", "TERMINALGATEWAYPROPS") && {
        title: "Properties",
        key: "properties",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Edit merchant"
            // content={Editor}
            contentProps={{ guid: cellInfo.merchant_guid }}
            button={<Button className="btn-table">Show</Button>}
            // dialogClassName="modal-creator"
          />
        ),
      },
    ],
    [ability]
  );
}
