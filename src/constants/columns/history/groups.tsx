import { useMemo } from "react";

export default function useGroupsAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Guid",
        dataIndex: "guid",
        key: "guid",
      },
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
        title: "Partner name",
        dataIndex: "partner_name",
        key: "partner_name",
      },
      {
        title: "Monthly amount limit",
        dataIndex: "monthly_amount_limit",
        key: "monthly_amount_limit",
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
