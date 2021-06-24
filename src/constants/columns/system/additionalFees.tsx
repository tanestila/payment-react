import { useMemo } from "react";
import { AppAbility } from "../../../Components/Common/Can";
import CustomModal from "../../../Components/Common/Modal";
import { ShopType } from "../../../types/shops";
import Editor from "../../../views/Shops/Editor";

export default function useAdditionalFees(ability: AppAbility) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "fee_name",
        key: "fee_name",
        sorter: true,
        search: "text",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        search: "bool",
        align: "center",
        render: (text: string, record: ShopType) => (
          <i
            className={
              record.enabled
                ? "icon-success green icon"
                : "icon-failed red icon"
            }
          />
        ),
      },

      ability.can("EXECUTE", "STATEMENTS") && {
        title: "Edit",
        key: "edit",
        align: "center",
        render: (text: string, record: ShopType) => (
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
    ],
    [ability]
  );
}
