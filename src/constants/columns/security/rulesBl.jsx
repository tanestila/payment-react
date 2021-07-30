import { useMemo } from "react";
import { DeleteModal } from "../../../Components/Common/DeleteModal";
import CustomModal from "../../../Components/Common/Modal";

export default function useBacklistRulesColumns(ability, handleDelete) {
  return useMemo(
    () => [
      {
        title: "name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "description",
        dataIndex: "description",
        key: "description",
      },

      ability.can("EXECUTE", "USERMERCHANT") && {
        title: "Edit",
        key: "edit",
        align: "center",
        render: (cellInfo: any) => (
          <CustomModal
            header="Edit merchant"
            // content={Editor}
            contentProps={{ guid: cellInfo.merchant_guid }}
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
        key: "delete",
        align: "center",
        render: (text, record) => (
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
