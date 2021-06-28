import { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";

export default function useBacklistRulesColumns(ability) {
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
      // ability.can("DELETE", "USERMERCHANT") && {
      //   title: "Delete",
      //   key: "delete",
      //   align: "center",
      //   render: () => <span>delete</span>,
      // },
    ],
    [ability]
  );
}
