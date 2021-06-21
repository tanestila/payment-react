import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import Editor from "../../views/Users/Merchants/Editor";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../Components/Common/DeleteModal";
import { GroupType } from "../../types/groups";
import { AppAbility } from "../../Components/Common/Can";

export default function useGroupsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Group name",
        dataIndex: "group_name",
        key: "group_name",
        sorter: true,
        search: "text",
        render: (text: string, record: GroupType) => (
          <Link className="link" to={`/about/group/${record.group_guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Group type",
        dataIndex: "group_type",
        key: "group_type",
        sorter: true,
        search: "text",
      },
      {
        title: "Partner",
        dataIndex: "partner_name",
        key: "partner_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "group_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
        search: "text",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
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

      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "",
        key: "edit",
        align: "center",
        render: (text: string, record: GroupType) => (
          <CustomModal
            header="Edit merchant"
            content={Editor}
            contentProps={{ guid: record.group_guid }}
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
        title: "",
        key: "delete",
        align: "center",
        render: (text: string, record: GroupType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(() => {}, record.group_guid)}
          />
        ),
      },
    ],
    [ability]
  );
}

export function useGroupsMerchantsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "merchant name",
        dataIndex: "merchant_name",
        key: "merchant_name",
        sorter: true,
        search: "text",
        render: (text: string, record: any) => (
          <Link className="link" to={`/about/merchant/${record.merchant_guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "merchant type",
        dataIndex: "merchant_type",
        key: "merchant_type",
        sorter: true,
        search: "text",
      },
    ],
    [ability]
  );
}
