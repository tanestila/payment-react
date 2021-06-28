import { useMemo } from "react";

export default function useGatewaysAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "description",
        dataIndex: "description",
        key: "description",
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
