import { useMemo } from "react";
import { DeleteModal } from "../../../Components/Common/DeleteModal";

export default function useBacklistMerchantColumns(ability, handleDelete) {
  return useMemo(
    () => [
      {
        title: "merchant_name",
        dataIndex: "merchant_name",
        key: "merchant_name",
      },
      {
        title: "blacklist_rule_name",
        dataIndex: "blacklist_rule_name",
        key: "blacklist_rule_name",
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
      },

      ability.can("DELETE", "USERADMIN") && {
        key: "delete",
        align: "center",
        render: (text, record) => (
          <i
            className="far fa-trash-alt  icon red"
            style={{ cursor: "pointer" }}
            onClick={() =>
              DeleteModal(handleDelete, {
                blacklist_rule_guid: record.blacklist_rule_guid,
                merchant_guid: record.merchant_guid,
              })
            }
          />
        ),
      },
    ],
    [ability]
  );
}
