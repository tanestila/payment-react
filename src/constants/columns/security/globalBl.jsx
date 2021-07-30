import { useMemo } from "react";
import { DeleteModal } from "../../../Components/Common/DeleteModal";

export default function useBacklistGlobalColumns(ability, handleDelete) {
  return useMemo(
    () => [
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
              })
            }
          />
        ),
      },
    ],
    [ability]
  );
}
