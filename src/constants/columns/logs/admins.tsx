import { useMemo } from "react";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { cutGuid } from "../../../helpers/cutGuid";

export default function useAdminsLogsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Request guid",
        dataIndex: "request_id",
        key: "request_id",
        search: "text",
        render: (text: any, record: any) => (
          <>
            <Copy text={text} />
            {cutGuid(text)}
          </>
        ),
      },
      {
        title: "Created at",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "IP",
        dataIndex: "ip",
        key: "ip",
      },
      {
        title: "Group guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "url",
        dataIndex: "URL",
        key: "URL",
        render: (text: any) => text.slice(7),
      },
      {
        title: "Headers",
        dataIndex: "headers",
        key: "headers",
        render: (text: string) => "headers",
      },
      {
        title: "Parameters",
        dataIndex: "parameters",
        key: "parameters",
        render: (text: string) => "parameters",
      },
      {
        title: "Request",
        dataIndex: "reqBody",
        key: "reqBody",
        render: (text: string) => "reqBody",
      },
      {
        title: "Response",
        dataIndex: "resBody",
        key: "resBody",
        render: (text: string) => "resBody",
      },
      {
        title: "Status code",
        dataIndex: "resStatusCode",
        key: "resStatusCode",
        render: (text: string) => "resStatusCode",
      },
    ],
    [ability]
  );
}
