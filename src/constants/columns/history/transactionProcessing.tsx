import { useMemo } from "react";

export default function useTransactionProcessingAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "date_time",
        dataIndex: "date_time",
        key: "date_time",
      },
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "transaction_guid",
        dataIndex: "transaction_guid",
        key: "transaction_guid",
      },
      {
        title: "transaction_type",
        dataIndex: "transaction_type",
        key: "transaction_type",
      },
      {
        title: "active",
        dataIndex: "active",
        key: "active",
      },

      {
        title: "parent_guid",
        dataIndex: "parent_guid",
        key: "parent_guid",
      },
      {
        title: "payment_status",
        dataIndex: "payment_status",
        key: "payment_status",
      },
      {
        title: "shop_name",
        dataIndex: "shop_name",
        key: "shop_name",
      },
      {
        title: "terminal_guid",
        dataIndex: "terminal_guid",
        key: "terminal_guid",
      },
      {
        title: "terminal_name",
        dataIndex: "terminal_name",
        key: "terminal_name",
      },
      {
        title: "test",
        dataIndex: "test",
        key: "test",
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "action",
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
