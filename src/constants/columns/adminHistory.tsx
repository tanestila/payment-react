import { useMemo } from "react";

export default function useAdminHistoryColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Group",
        dataIndex: "group_name",
        key: "group_name",
      },
      {
        title: "Connection fee",
        dataIndex: "connection_fee",
        key: "connection_fee",
      },
      {
        title: "Monthly fee",
        dataIndex: "monthly_fee",
        key: "monthly_fee",
      },
      {
        title: "Monthly amount limit",
        dataIndex: "monthly_amount_limit",
        key: "monthly_amount_limit",
      },
      {
        title: "Merchant period limit",
        dataIndex: "custom_days_limit",
        key: "custom_days_limit",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
      {
        title: "Author",
        dataIndex: "author_username",
        key: "author_username",
      },
    ],
    [ability]
  );
}
