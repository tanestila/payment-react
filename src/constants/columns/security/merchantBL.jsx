import { useMemo } from "react";

export default function useBacklistMerchantColumns(ability) {
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
