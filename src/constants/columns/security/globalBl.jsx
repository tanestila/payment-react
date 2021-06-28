import { useMemo } from "react";

export default function useBacklistGlobalColumns(ability) {
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
