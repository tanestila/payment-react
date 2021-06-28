import { useMemo } from "react";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { Link } from "react-router-dom";
import { cutGuid } from "../../../helpers/cutGuid";

export default function useServiceLogsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        search: "text",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
      {
        title: "info",
        dataIndex: "info",
        key: "info",
      },
    ],
    [ability]
  );
}
