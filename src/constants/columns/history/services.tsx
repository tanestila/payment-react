import { useMemo } from "react";

export default function useServiceAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "start_time",
        dataIndex: "start_time",
        key: "start_time",
      },
      // {
      //   title: "options",
      //   dataIndex: "options",
      //   key: "options",
      // },
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
