import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../Components/Common/DeleteModal";
import Params from "../../views/Terminals/Params";
import Editor from "../../views/Terminals/Editor";
import { GenerateNewSecret } from "../../views/Terminals/GenerateNewSecret";

export default function useTerminalsColumns(ability, handleDelete, shop_guid) {
  return useMemo(
    () => [
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
        render: (text: string) => (
          <Link className="link" to={`/about/${shop_guid}/terminal/${text}`}>
            {text}
          </Link>
        ),
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
            header="Edit properties"
            content={Params}
            contentProps={{
              terminal_guid: cellInfo.guid,
              gateway_guid: cellInfo.gateway_guid,
            }}
            button={<Button className="btn-table">Show</Button>}
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("EXECUTE", "TERMINALGENERATECREDENTIALS") && {
        title: "generate",
        key: "generate",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header=""
            content={GenerateNewSecret}
            contentProps={{
              terminal_guid: cellInfo.guid,
            }}
            button={
              <i
                className="fas fa-sync icon blue"
                style={{ cursor: "pointer" }}
              />
            }
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("EXECUTE", "SHOPTERMINALS") && {
        key: "edit",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Edit terminal"
            content={Editor}
            contentProps={{
              terminal_guid: cellInfo.guid,
              shop_guid,
            }}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
            dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("DELETE", "USERMERCHANT") && {
        title: "",
        key: "delete",
        align: "center",
        render: (cellInfo) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() =>
              DeleteModal(handleDelete, { shop_guid, guid: cellInfo.guid })
            }
          />
        ),
      },
    ],
    [ability]
  );
}
