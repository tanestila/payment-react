import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Button } from "antd";
import { AppAbility } from "../../../Components/Common/Can";
import Editor from "../../../views/Users/Merchants/Editor";
import { DeleteModal } from "../../../Components/Common/DeleteModal";
import { LoginAudit } from "../../../views/Users/Common/LoginAudit";
import { LoginEditor } from "../../../views/Users/Common/LoginEditor";

export default function useLoginColumns(
  ability: AppAbility,
  type,
  guid,
  handleDelete
) {
  return useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role.name",
        key: "role.name",
      },
      {
        title: "First name",
        dataIndex: "first_name",
        key: "first_name",
      },

      {
        title: "Last name",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Company name",
        dataIndex: "company_name",
        key: "company_name",
      },
      {
        title: "Company address",
        dataIndex: "company_address",
        key: "company_address",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        width: 70,
        align: "center",
        render: (text: any, record: any) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },
      ability.can("REPORT", "REASONSLOGIN") && {
        title: "History",
        key: "history",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Login history"
            content={LoginAudit}
            contentProps={{ guid: cellInfo.guid }}
            button={<Button className="btn-table">Show</Button>}
            dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "Edit",
        key: "edit",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Edit login"
            content={LoginEditor}
            contentProps={{
              guid,
              type,
              login: cellInfo,
              ability,
            }}
            button={
              <i
                className="icon-edit icon gray"
                style={{ cursor: "pointer" }}
              />
            }
            // dialogClassName="modal-creator"
          />
        ),
      },
      ability.can("DELETE", "USERMERCHANT") && {
        title: "Delete",
        key: "delete",
        align: "center",
        render: (text, record) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() =>
              DeleteModal(handleDelete, {
                guid,
                login_guid: record.guid,
                role_guid: record.role.guid,
              })
            }
          />
        ),
      },
    ],
    [ability]
  );
}
