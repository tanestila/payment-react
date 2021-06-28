import { useMemo } from "react";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { Link } from "react-router-dom";
import { cutGuid } from "../../../helpers/cutGuid";

export default function useTransactionsLogsColumns(ability) {
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
        title: "Step info",
        dataIndex: "step_info",
        key: "step_info",
      },
      {
        title: "Transaction guid",
        dataIndex: "transaction_guid",
        key: "transaction_guid",
        search: "text",
        // render: (text: any, record: any) => (
        //   <>
        //     <Copy text={text} />
        //     {cutGuid(text)}
        //   </>
        // ),
      },

      {
        title: "Shop",
        dataIndex: "shop_name",
        key: "shop_name",
        render: (text: any, record: any) => (
          <>
            <Copy text={record.shop_guid} />
            {cutGuid(record.shop_guid)}
          </>
        ),
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
        render: (text: string) => "message",
      },
    ],
    [ability]
  );
}
