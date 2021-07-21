import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Editor } from "../../../views/System/Gateways/Editor";
import { Link } from "react-router-dom";
import { DeleteModal } from "../../../Components/Common/DeleteModal";
import { GroupType } from "../../../types/groups";
import { AppAbility } from "../../../Components/Common/Can";

export default function useGatewaysColumns(ability: AppAbility, handleDelete) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        search: "text",
        render: (text: string, record: GroupType) => (
          <Link className="link" to={`/about/gateway/${record.guid}`}>
            {text}
          </Link>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        sorter: true,
        search: "text",
      },
      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "",
        key: "edit",
        align: "center",
        render: (text: string, record: GroupType) => (
          <CustomModal
            header="Edit merchant"
            content={Editor}
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
      ability.can("DELETE", "USERMERCHANT") && {
        title: "",
        key: "delete",
        align: "center",
        render: (text: string, record: GroupType) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteModal(handleDelete, { guid: record.guid })}
          />
        ),
      },
    ],
    [ability]
  );
}
