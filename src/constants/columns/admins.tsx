import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { AppAbility } from "../../Components/Common/Can";
import { AdminType } from "../../types/admins";
import { DeleteModal } from "../../Components/Common/DeleteModal";

export default function useAdminsColumns(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        sorter: true,
        search: "text",
        render: (text: string, record: AdminType) => (
          <Link className="link" to={`/about/admin/${record.guid}`}>
            {text}
          </Link>
        ),
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
        render: (text: string, record: AdminType) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },
      // {
      //   title: "Action",
      //   key: "action",

      //   render: (text: any, record: any) => (
      //     <Space size="middle">
      //       <a>Invite {record.name}</a>
      //       <a>Delete</a>
      //     </Space>
      //   ),
      // },
      ability.can("EXECUTE", "USERADMIN") && {
        title: "",
        key: "edit",
        align: "center",
        render: (text: string, record: AdminType) => (
          <CustomModal
            header="Edit merchant"
            content={<></>}
            contentProps={{ guid: record.guid }}
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
      ability.can("DELETE", "USERADMIN") && {
        title: "",
        key: "delete",
        align: "center",
        render: (text: string, record: AdminType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(() => {}, record.guid)}
          />
        ),
      },
    ],
    [ability]
  );
}
